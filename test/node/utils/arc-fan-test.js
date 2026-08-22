// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import test from 'tape';
import {computeArcFanTilts, makePointCoordReader} from '../../../src/layers/src/arc-layer/arc-fan';

test('Utils -> computeArcFanTilts', t => {
  const positions = [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [2, 2, 3, 3]
  ];
  const tilts = computeArcFanTilts(positions.length, i => positions[i], 30);

  t.equal(tilts[0], -30, 'first overlapping arc tilts left');
  t.equal(tilts[1], 30, 'second overlapping arc tilts right');
  t.equal(tilts[2], 0, 'unique pair stays untilted');
  t.end();
});

test('Utils -> computeArcFanTilts splits reverse OD pairs', t => {
  const positions = [
    [0, 0, 1, 1],
    [1, 1, 0, 0],
    [2, 2, 3, 3]
  ];
  const tilts = computeArcFanTilts(positions.length, i => positions[i], 35);

  t.equal(tilts[0], 35, 'outbound A→B leaves the geodesic');
  t.equal(tilts[1], 35, 'return B→A uses the same signed tilt (axis is reversed)');
  t.equal(tilts[2], 0, 'unrelated one-way pair stays untilted');
  t.end();
});

test('Utils -> makePointCoordReader reads interleaved buffers', t => {
  const values = new Float32Array([10, 20, 30, 40, 50, 60]);
  const reader = makePointCoordReader({
    length: 3,
    data: [{length: 3, children: [{values}], type: {listSize: 2}}]
  });
  const out = [0, 0];

  t.equal(reader.length, 3, 'reader length matches vector');
  t.ok(reader.read(1, out), 'should read the second point');
  t.deepEqual(out, [30, 40], 'should use packed lng/lat, not vector.get');
  t.end();
});
