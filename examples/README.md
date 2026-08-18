# Examples

A list of examples demonstrating how to add `kepler.gl` to your app. Each example is a standalone project that can be run locally.

## Getting started

Each example has its own `package.json`. To run one, `cd` into its folder and install dependencies:

```sh
touch yarn.lock && yarn
```

> `touch yarn.lock` is required the first time so Yarn treats the folder as a
> standalone project, independent from the kepler.gl monorepo.

Then start the dev server:

```sh
yarn start
```

### Windows and Yarn 4

Example folders are **not** listed in the root `package.json` `workspaces`, so Yarn needs a **local `yarn.lock`** in each example (this repo includes a stub file; the first `yarn install` there will fill it in).

From the **repository root**, after `yarn install` at the root:

- **Demo app:** `yarn start:windows` (sets OpenSSL / esbuild env for Windows).
- **Other examples:** `yarn start:open-modal:windows`, `yarn start:custom-reducer:windows`, `yarn start:replace-component:windows`, `yarn start:custom-theme:windows`, `yarn start:custom-map-style:windows`, `yarn start:yandex-tiles-api:windows`, `yarn start:node-app:windows`.

Or manually: `cd examples/<name>`, then `yarn install`, then `yarn start-local` / `yarn start:local` / `yarn start` as in that folder’s `package.json`.

**Port 8080 already in use** (e.g. demo-app is running): stop the other dev server, or run another example on a free port, for example in PowerShell:

`$env:PORT='8081'; yarn start:custom-theme:windows`

On Unix/macOS you can keep using `yarn start:open-modal` etc.

## Examples

- ### [Get Started][get-started]
  Minimal kepler.gl setup with esbuild.

- ### [Get Started (Vite)][get-started-vite]
  Minimal kepler.gl setup with Vite.

- ### [DuckDB (Vite)][duckdb-vite]
  Minimal kepler.gl setup with the DuckDB plugin and Vite.


- ### [Demo App][demo-app]
  kepler.gl as a full single-page app — loads sample maps from remote URLs and saves map data to Dropbox. This is also the source code of kepler.gl/#/demo.

- ### [Open Modal][open-modal]
  Embed kepler.gl inside a `react-modal` dialog, demonstrating both fresh-state and saved-state lifecycle behaviors.

- ### [Custom Reducer][custom-reducer]
  Customize the kepler.gl reducer's initial state and extend it with additional actions using the plugin system.

- ### [Replace UI Component][replace-component]
  Replace kepler.gl's default UI components using the `injectComponents` method.

- ### [Custom Theme][custom-theme]
  Customize the kepler.gl theme by overriding default style properties.

- ### [Custom Layer][custom-layer]
  Add a custom deck.gl layer (`ContourLayer`) to kepler.gl's layer type selector, so it can be picked from the dropdown, configured with dataset columns, and rendered on the map.

- ### [Custom Map Style][custom-map-style]
  Use kepler.gl with basemap services other than Mapbox (e.g. MapLibre / Carto).

- ### [Yandex Tiles API][yandex-tiles-api]
  Use [Yandex Maps Tiles API](https://yandex.ru/maps-api/docs/tiles-api/index.html) raster tiles as the kepler.gl basemap (MapLibre + `projection=web_mercator`).

- ### [Node App][node-app]
  Embed kepler.gl in a Node.js/Express application — builds the bundle with esbuild and serves it as static files.

- ### [UMD Client][umd-client]
  A single HTML file that loads kepler.gl from CDN — no build tool or `npm install` required. Works when opened directly from disk.

[get-started]: get-started/README.md
[get-started-vite]: get-started-vite/README.md
[duckdb-vite]: duckdb-vite/README.md
[demo-app]: demo-app/README.md
[open-modal]: open-modal/README.md
[custom-reducer]: custom-reducer/README.md
[replace-component]: replace-component/README.md
[custom-theme]: custom-theme/README.md
[custom-layer]: custom-layer/README.md
[custom-map-style]: custom-map-style/README.md
[yandex-tiles-api]: yandex_tiles_api/README.md
[node-app]: node-app/README.md
[umd-client]: umd-client/README.md

## Mapbox token

All examples default to a **MapLibre / Carto basemap** so they work without any token.

The [Yandex Tiles API][yandex-tiles-api] example is the exception: it needs `YandexTilesApiKey` (see that folder’s README).

If you want to use **Mapbox basemaps**, set the `MapboxAccessToken` environment variable before starting an example:

```sh
export MapboxAccessToken=<your_mapbox_token>
yarn start
```

For `umd-client` (no build step), edit `index.html` and set `window.MAPBOX_TOKEN` near the top of the file instead.

For `demo-app`, create a `.env` file from `.env.template` at the repo root and fill in `MAPBOX_ACCESS_TOKEN` and other optional cloud integration tokens.
