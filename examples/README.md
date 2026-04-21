# Examples

A list of examples to demonstrate adding `kepler.gl` to your app. Each of the examples is a complete project that can be ran locally.

To start each example, cd into the folder then run:

```
yarn && yarn start
```

### Windows and Yarn 4

Example folders are **not** listed in the root `package.json` `workspaces`, so Yarn needs a **local `yarn.lock`** in each example (this repo includes a stub file; the first `yarn install` there will fill it in).

From the **repository root**, after `yarn install` at the root:

- **Demo app:** `yarn start:windows` (sets OpenSSL / esbuild env for Windows).
- **Other examples:** `yarn start:open-modal:windows`, `yarn start:custom-reducer:windows`, `yarn start:replace-component:windows`, `yarn start:custom-theme:windows`, `yarn start:custom-map-style:windows`, `yarn start:node-app:windows`.

Or manually: `cd examples/<name>`, then `yarn install`, then `yarn start-local` / `yarn start:local` / `yarn start` as in that folder’s `package.json`.

**Port 8080 already in use** (e.g. demo-app is running): stop the other dev server, or run another example on a free port, for example in PowerShell:

`$env:PORT='8081'; yarn start:custom-theme:windows`

On Unix/macOS you can keep using `yarn start:open-modal` etc.

- ### [Demo App][demo-app]

  kepler.gl as a single page app, loading sample maps from remote url, saving map data to dropbox. This is also the source code of kepler.gl/#/demo.

- ### [Open Modal][open-modal]
  Open kepler.gl in a modal.

- ### [Custom Reducer][custom-reducer]
  Customize kepler.gl reducer initial state, adding more actions using plugin.

- ### [umd client][umd-client]
  A single html file loading kepler.gl

- ### [Replace UI Component][replace-component]
  Example showing how to replace kepler.gl default ui components using `injectComponents` method.

- ### [Custom theme][custom-theme]
  Customize kepler.gl theme by override default style properties.

- ### [Node App][node-app]
  Embed Kepler.gl in a node/express/webpack application. 

- ### [Custom map style][custom-map-style]

  Demo how to use kepler.gl with other basemap services other than Mapbox.
[custom-reducer]: custom-reducer/README.md
[demo-app]: demo-app/README.md
[node-app]: node-app/README.md

[open-modal]: open-modal/README.md
[umd-client]: umd-client/README.md
[replace-component]: replace-component/README.md
[custom-theme]: custom-theme/README.md
[custom-map-style]: custom-map-style/README.md
