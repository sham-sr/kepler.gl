// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

export const HAS_YANDEX_TILES_KEY = Boolean(process.env.HAS_YANDEX_TILES_KEY);

export const YANDEX_MAPS_HOME = 'https://yandex.ru/maps/';
export const YANDEX_MAPS_TERMS = 'https://yandex.ru/legal/maps_termsofuse';

/** Same-origin path served by the example dev server (avoids Yandex CORS). */
export const YANDEX_TILE_PROXY_PATH = '/yandex-tiles';

export const YANDEX_STYLE_ID = 'yandex';

type YandexTileOptions = {
  lang?: string;
  maptype?: 'map' | 'future_map' | 'driving' | 'transit' | 'admin';
};

/**
 * XYZ template for the local tile proxy.
 * The proxy adds `projection=web_mercator` and the API key server-side so tiles
 * align with MapLibre / deck.gl (EPSG:3857) and the key never reaches the browser.
 */
export function buildYandexTileUrl(options: YandexTileOptions = {}): string {
  const lang = options.lang ?? 'ru_RU';
  const maptype = options.maptype ?? 'map';
  return (
    `${YANDEX_TILE_PROXY_PATH}?x={x}&y={y}&z={z}` +
    `&lang=${encodeURIComponent(lang)}&maptype=${encodeURIComponent(maptype)}`
  );
}

export function createYandexMapStyle(options: YandexTileOptions = {}) {
  return {
    version: 8 as const,
    name: 'Yandex Map',
    sources: {
      yandex: {
        type: 'raster' as const,
        tiles: [buildYandexTileUrl(options)],
        tileSize: 256,
        maxzoom: 20,
        attribution: `<a href="${YANDEX_MAPS_HOME}" target="_blank" rel="noopener noreferrer">© Яндекс</a>`
      }
    },
    layers: [
      {
        id: 'background',
        type: 'background' as const,
        paint: {
          'background-color': '#f2f3f5'
        }
      },
      {
        id: 'yandex-basemap',
        type: 'raster' as const,
        source: 'yandex',
        minzoom: 0,
        maxzoom: 21
      }
    ]
  };
}

export const YANDEX_STYLE_ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#FC3F1D"/><text x="32" y="42" text-anchor="middle" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#fff">Я</text></svg>'
)}`;
