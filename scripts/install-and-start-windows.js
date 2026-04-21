// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

const {existsSync} = require('fs');
const {execSync} = require('child_process');

const folder = process.argv[2];
const script = process.argv[3];

if (!folder || !script) {
  console.error('Usage: node ./scripts/install-and-start-windows <folder> <script>');
  process.exit(1);
}

process.env.KEPLER_ESBUILD_SANITIZE_ENV = process.env.KEPLER_ESBUILD_SANITIZE_ENV || '1';
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--openssl-legacy-provider';
process.env.KEPLER_USE_LOCAL_DUCKDB = process.env.KEPLER_USE_LOCAL_DUCKDB || '1';

const cmd = !existsSync(`${folder}/node_modules`) ? `yarn && yarn ${script}` : `yarn ${script}`;

execSync(cmd, {
  cwd: folder,
  stdio: 'inherit'
});
