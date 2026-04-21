// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

const {existsSync, statSync} = require('fs');
const {execSync} = require('child_process');

const folder = process.argv[2];
const script = process.argv[3];

const lockPath = `${folder}/yarn.lock`;
const lockMissingOrEmpty = !existsSync(lockPath) || statSync(lockPath).size === 0;
const needsInstall = !existsSync(`${folder}/node_modules`) || lockMissingOrEmpty;

const cmd = needsInstall ? `yarn && yarn ${script}` : `yarn ${script}`;

execSync(cmd, {
  cwd: folder,
  stdio: 'inherit'
});
