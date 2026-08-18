# Yandex Tiles API

Demo showing how to use [Yandex Maps Tiles API](https://yandex.ru/maps-api/docs/tiles-api/index.html)
as the kepler.gl basemap instead of Mapbox / CARTO.

kepler.gl still renders with **MapLibre GL**. This example only swaps the basemap tile source
for Yandex raster PNG tiles (`256×256`, schema / `l=map`).

## What this example does

- Builds a MapLibre `style.json` with a `raster` source
- Dev server **proxies** tiles through `/yandex-tiles` (Yandex does not send CORS headers,
  so the browser cannot fetch `tiles.api-maps.yandex.ru` directly)
- Forces `projection=web_mercator` so tiles line up with deck.gl layers (EPSG:3857).
  Yandex default is elliptical Mercator (`wgs84_mercator`) and would shift your data.
- Keeps the API key on the server; it is not sent to the browser
- Replaces default basemap styles with a single **Yandex** style
- Overlays a clickable Яндекс logo (required by the Tiles API)
- Starts centered on Moscow

Satellite / hybrid tiles are not available from this API. Layer-group toggles
(label / road / building) do not apply: the basemap is a single raster image.

## Pre-requirements

- [Node.js ^20.x](http://nodejs.org)
- [Yarn 4.4.0](https://yarnpkg.com): See the [installation instructions][yarn-install].
- A **Tiles API** key from the [Yandex Developer Dashboard](https://developer.tech.yandex.ru/).
  The key can take up to 15 minutes to activate.

## 1. Set the API key

Copy `.env.template` to `.env` in this folder (or add the variable to the repo-root `.env`):

```
YandexTilesApiKey=your_key_here
YandexTilesApiSecret=your_signing_secret_here
```

`YandexTilesApiSecret` is required if the key has **Подпись только секретом** enabled in the Yandex dashboard. Use the full secret shown once when it was created — the masked value (`gSc2****`) will not work. If the secret was lost, create a new one. See [request signing](https://yandex.ru/maps-api/docs/common/security/signature_usage.html).

PowerShell:

```powershell
$env:YandexTilesApiKey='your_key_here'
```

## 2. Install Dependencies

Go to the `examples/yandex_tiles_api` directory and run:

```sh
touch yarn.lock && yarn
```

> `touch yarn.lock` is required once to mark this directory as a standalone Yarn project,
> independent of the monorepo root.

## 3. Start the App

```sh
yarn start
```

From the repository root:

```sh
yarn start:yandex-tiles-api
```

On Windows:

```sh
yarn start:yandex-tiles-api:windows
```

The app will be available at [http://localhost:8080](http://localhost:8080).

If port 8080 is already in use:

```powershell
$env:PORT='8081'; yarn start
```

## Production Build

```sh
yarn build
```

The output will be in the `dist/` directory.

## Notes

- Free Tiles API usage is limited to **30 RPS**. Panning/zooming can request many tiles at once.
- The logo must stay visible and must link to [Yandex Maps](https://yandex.ru/maps/).
  See [logo requirements](https://yandex.ru/maps-api/docs/tiles-api/index.html).
- Terms of use: [yandex.ru/legal/maps_termsofuse](https://yandex.ru/legal/maps_termsofuse).
- `yarn start` proxies `/yandex-tiles` → Yandex Tiles API. A production deploy needs the same
  proxy on your backend; do not call `tiles.api-maps.yandex.ru` from the browser.

Read more about [custom map styles][custom-map-styles].

[custom-map-styles]: https://docs.kepler.gl/docs/api-reference/advanced-usages/custom-map-styles
[yarn-install]: https://yarnpkg.com/getting-started/install
