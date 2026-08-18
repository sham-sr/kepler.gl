// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import esbuild from 'esbuild';
import copyPlugin from 'esbuild-plugin-copy';

import process from 'node:process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';

const args = process.argv;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Windows env vars like ProgramFiles(x86) are not valid esbuild `define` identifiers.
const sanitizeEnvForDefine = () => {
  Object.keys(process.env).forEach(key => {
    if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) {
      delete process.env[key];
    }
  });
};

if (process.platform === 'win32') {
  sanitizeEnvForDefine();
}

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

readEnvFile(path.resolve(__dirname, '../../.env'));
readEnvFile(path.resolve(__dirname, '.env'));

const port = Number(process.env.PORT) || 8080;

const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'production');
const yandexTilesApiKey = process.env.YandexTilesApiKey || process.env.YANDEX_TILES_API_KEY || '';
const yandexTilesApiSecret =
  process.env.YandexTilesApiSecret || process.env.YANDEX_TILES_API_SECRET || '';

const YANDEX_TILE_PROXY_PATH = '/yandex-tiles';
const ALLOWED_LANGS = new Set(['ru_RU', 'en_RU', 'en_US', 'uk_UA', 'ru_UA', 'tr_TR']);
const ALLOWED_MAPTYPES = new Set(['map', 'future_map', 'driving', 'transit', 'admin']);
let loggedYandex403 = false;

const config = {
  platform: 'browser',
  format: 'iife',
  logLevel: 'info',
  loader: {'.js': 'jsx', '.ts': 'ts', '.tsx': 'tsx', '.css': 'css'},
  entryPoints: ['src/main.tsx'],
  outfile: 'dist/bundle.js',
  bundle: true,
  define: {
    NODE_ENV,
    'process.env.HAS_YANDEX_TILES_KEY': JSON.stringify(Boolean(yandexTilesApiKey))
  },
  plugins: [
    // styled-components: @hubble.gl/react nests its own copy.
    // react-palm: several @kepler.gl/* packages nest their own copy.
    // Both are singletons that break when loaded more than once.
    {
      name: 'dedupe-singletons',
      setup(build) {
        build.onResolve(
          {filter: /^(styled-components|react-palm(\/|$)|react$|react-dom$)/},
          async args => {
            if (args.pluginData?.deduped) return;
            const result = await build.resolve(args.path, {
              resolveDir: __dirname,
              kind: args.kind,
              pluginData: {deduped: true}
            });
            return result;
          }
        );
      }
    },
    copyPlugin({
      resolveFrom: 'cwd',
      assets: {
        from: ['index.html'],
        to: ['dist/index.html']
      }
    })
  ]
};

function decodeYandexSecret(secret) {
  const padded = secret.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + '='.repeat(padLen), 'base64');
}

function toBase64Url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}

/** https://yandex.ru/maps-api/docs/common/security/signature_usage.html */
function signYandexRequest(pathAndQuery, secret) {
  const key = decodeYandexSecret(secret);
  const hmac = crypto.createHmac('sha256', key).update(pathAndQuery, 'utf8').digest();
  return toBase64Url(hmac);
}

function sendJson(res, status, body) {
  if (res.headersSent) {
    return;
  }
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(body));
}

function proxyYandexTile(req, res) {
  const incoming = new URL(req.url || '/', 'http://127.0.0.1');
  if (incoming.pathname !== YANDEX_TILE_PROXY_PATH) {
    return false;
  }

  if (!yandexTilesApiKey) {
    sendJson(res, 503, {error: 'YandexTilesApiKey is not set'});
    return true;
  }

  const x = Number(incoming.searchParams.get('x'));
  const y = Number(incoming.searchParams.get('y'));
  const z = Number(incoming.searchParams.get('z'));
  if (!Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z) || z < 0 || z > 20) {
    sendJson(res, 400, {error: 'Invalid tile coordinates'});
    return true;
  }
  const maxIndex = 2 ** z;
  if (x < 0 || y < 0 || x >= maxIndex || y >= maxIndex) {
    sendJson(res, 400, {error: 'Tile coordinates out of range'});
    return true;
  }

  const lang = incoming.searchParams.get('lang') || 'ru_RU';
  const maptype = incoming.searchParams.get('maptype') || 'map';
  if (!ALLOWED_LANGS.has(lang) || !ALLOWED_MAPTYPES.has(maptype)) {
    sendJson(res, 400, {error: 'Invalid lang or maptype'});
    return true;
  }

  const query =
    `x=${x}&y=${y}&z=${z}&lang=${encodeURIComponent(lang)}&l=map` +
    `&projection=web_mercator&maptype=${encodeURIComponent(maptype)}` +
    `&apikey=${encodeURIComponent(yandexTilesApiKey)}`;
  let pathAndQuery = `/v1/tiles/?${query}`;
  if (yandexTilesApiSecret) {
    pathAndQuery += `&signature=${signYandexRequest(pathAndQuery, yandexTilesApiSecret)}`;
  }

  const tileReq = https.get(`https://tiles.api-maps.yandex.ru${pathAndQuery}`, tileRes => {
    if (tileRes.statusCode === 403) {
      const chunks = [];
      tileRes.on('data', chunk => chunks.push(chunk));
      tileRes.on('end', () => {
        if (!loggedYandex403) {
          loggedYandex403 = true;
          const body = Buffer.concat(chunks).toString('utf8').slice(0, 400);
          console.warn(
            'Yandex Tiles API returned 403. If the key uses "sign with secret only", add YandexTilesApiSecret to .env (full secret, not the masked gSc2**** value). Docs: https://yandex.ru/maps-api/docs/common/security/signature_usage.html'
          );
          if (body) {
            console.warn(body);
          }
        }
        sendJson(res, 403, {error: 'Yandex Tiles API forbidden'});
      });
      return;
    }
    res.writeHead(tileRes.statusCode || 502, {
      'Content-Type': tileRes.headers['content-type'] || 'image/png',
      'Cache-Control': tileRes.headers['cache-control'] || 'public, max-age=3600'
    });
    tileRes.pipe(res);
  });
  tileReq.on('error', () => {
    sendJson(res, 502, {error: 'Failed to fetch Yandex tile'});
  });
  tileReq.setTimeout(15000, () => {
    tileReq.destroy();
    sendJson(res, 504, {error: 'Yandex tile request timed out'});
  });
  return true;
}

function proxyToEsbuild(esbuildPort, req, res) {
  const proxyReq = http.request(
    {
      hostname: '127.0.0.1',
      port: esbuildPort,
      path: req.url,
      method: req.method,
      headers: {...req.headers, host: `127.0.0.1:${esbuildPort}`}
    },
    proxyRes => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );
  proxyReq.on('error', () => {
    sendJson(res, 502, {error: 'Dev server proxy failed'});
  });
  req.pipe(proxyReq);
}

function openURL(url) {
  const cmd = {
    darwin: ['open'],
    linux: ['xdg-open'],
    win32: ['cmd', '/c', 'start']
  };
  const command = cmd[process.platform];
  if (command) {
    spawn(command[0], [...command.slice(1), url]);
  }
}

(async () => {
  if (args.includes('--build')) {
    const result = await esbuild
      .build({
        ...config,
        minify: true,
        sourcemap: false,
        metafile: true,
        define: {
          ...config.define,
          'process.env.NODE_ENV': '"production"'
        }
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      });
    fs.writeFileSync('dist/esbuild-metadata.json', JSON.stringify(result.metafile));
  }

  if (args.includes('--start')) {
    if (!yandexTilesApiKey) {
      console.warn(
        'YandexTilesApiKey is not set. Add it to .env (repo root or this example) or export it before yarn start.'
      );
    } else if (!yandexTilesApiSecret) {
      console.warn(
        'YandexTilesApiSecret is not set. If the key requires "sign with secret only", Yandex will return 403 until the secret is added.'
      );
    }
    await esbuild
      .context({
        ...config,
        minify: false,
        sourcemap: true,
        banner: {
          js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`
        }
      })
      .then(async ctx => {
        await ctx.watch();
        // Bind esbuild to localhost only; the public server on `port` proxies
        // Yandex tiles (no CORS) and forwards everything else to esbuild.
        const {port: esbuildPort} = await ctx.serve({
          servedir: 'dist',
          host: '127.0.0.1',
          port: 0,
          fallback: 'dist/index.html'
        });
        http
          .createServer((req, res) => {
            const started = Date.now();
            res.on('finish', () => {
              const urlPath = req.url?.split('?')[0] || '/';
              if (urlPath === YANDEX_TILE_PROXY_PATH) {
                return;
              }
              console.info(
                res.statusCode,
                `"${req.method} ${urlPath}" [${Date.now() - started}ms]`
              );
            });
            if (proxyYandexTile(req, res)) {
              return;
            }
            proxyToEsbuild(esbuildPort, req, res);
          })
          .listen(port, () => {
            console.info(`kepler.gl yandex_tiles_api example running at http://localhost:${port}`);
            openURL(`http://localhost:${port}`);
          });
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      });
  }
})();
