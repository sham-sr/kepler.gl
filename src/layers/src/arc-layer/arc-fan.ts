// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

/** Rounding for OD grouping (~1.1 m). Nearby float jitter still fans as one pair. */
export const ARC_FAN_COORD_PRECISION = 5;

export type ArcFanPosition = [number, number, number, number];

export type PointCoordReader = {
  length: number;
  read: (index: number, out: [number, number]) => boolean;
};

type PointChunk = {
  values: ArrayLike<number>;
  stride: number;
  start: number;
  end: number;
};

function endpointKey(lng: number, lat: number): string {
  return `${lng.toFixed(ARC_FAN_COORD_PRECISION)},${lat.toFixed(ARC_FAN_COORD_PRECISION)}`;
}

/**
 * Undirected station pair (A↔B). `dir` is 0 when source sorts first, 1 for the reverse.
 * deck.gl `getTilt` rotates around source→target, so the same signed tilt on A→B and B→A
 * lands on opposite sides of the corridor.
 */
function corridorKey(
  lng0: number,
  lat0: number,
  lng1: number,
  lat1: number
): {key: string; dir: 0 | 1} {
  const src = endpointKey(lng0, lat0);
  const tgt = endpointKey(lng1, lat1);
  if (src <= tgt) {
    return {key: `${src}<->${tgt}`, dir: 0};
  }
  return {key: `${tgt}<->${src}`, dir: 1};
}

type CorridorGroup = {dir0: number[]; dir1: number[]};

function assignSymmetricFan(indices: number[], maxTilt: number, tilts: Float32Array): void {
  const n = indices.length;
  if (n <= 1) {
    return;
  }
  const last = n - 1;
  for (let k = 0; k < n; k++) {
    tilts[indices[k]] = -maxTilt + (2 * maxTilt * k) / last;
  }
}

function assignSameSignFan(indices: number[], maxTilt: number, tilts: Float32Array): void {
  const n = indices.length;
  if (n === 0) {
    return;
  }
  if (n === 1) {
    tilts[indices[0]] = maxTilt;
    return;
  }
  for (let k = 0; k < n; k++) {
    tilts[indices[k]] = (maxTilt * (k + 1)) / n;
  }
}

/**
 * Assigns deck.gl ArcLayer `getTilt` so stacked OD arcs spread sideways.
 * One-way unique pairs stay at 0. A→B and B→A share a corridor and get the same
 * signed tilt so reverse trips do not collapse onto one geodesic.
 */
export function computeArcFanTilts(
  count: number,
  getSourceTarget: (index: number) => ArcFanPosition | null,
  tiltMax: number,
  isVisible?: (index: number) => boolean
): Float32Array {
  const tilts = new Float32Array(count);
  const maxTilt = Math.max(0, Math.min(90, tiltMax));
  if (count <= 0 || maxTilt === 0) {
    return tilts;
  }

  const groups = new Map<string, CorridorGroup>();
  for (let i = 0; i < count; i++) {
    if (isVisible && !isVisible(i)) {
      continue;
    }
    const pos = getSourceTarget(i);
    if (!pos || !Number.isFinite(pos[0]) || !Number.isFinite(pos[1]) || !Number.isFinite(pos[2]) || !Number.isFinite(pos[3])) {
      continue;
    }
    const {key, dir} = corridorKey(pos[0], pos[1], pos[2], pos[3]);
    let group = groups.get(key);
    if (!group) {
      group = {dir0: [], dir1: []};
      groups.set(key, group);
    }
    if (dir === 0) {
      group.dir0.push(i);
    } else {
      group.dir1.push(i);
    }
  }

  for (const {dir0, dir1} of groups.values()) {
    const hasBoth = dir0.length > 0 && dir1.length > 0;
    if (hasBoth) {
      assignSameSignFan(dir0, maxTilt, tilts);
      assignSameSignFan(dir1, maxTilt, tilts);
    } else {
      assignSymmetricFan(dir0.length ? dir0 : dir1, maxTilt, tilts);
    }
  }

  return tilts;
}

export function readPointLngLat(point: unknown): [number, number] | null {
  if (point == null || (typeof point !== 'object' && !Array.isArray(point))) {
    return null;
  }
  const value = point as {get?: (i: number) => number; [i: number]: number};
  const lng = typeof value.get === 'function' ? value.get(0) : value[0];
  const lat = typeof value.get === 'function' ? value.get(1) : value[1];
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    return null;
  }
  return [lng, lat];
}

/**
 * Reads lng/lat from a geoarrow FixedSizeList point vector via interleaved buffers.
 * Falls back to `vector.get(i)` when the Arrow layout is not a packed list.
 */
export function makePointCoordReader(vector: {
  length: number;
  data?: readonly {
    length: number;
    children?: {values?: ArrayLike<number>}[];
    type?: {listSize?: number};
  }[];
  get?: (index: number) => unknown;
}): PointCoordReader {
  const chunks: PointChunk[] = [];
  let start = 0;
  const dataList = vector.data;
  if (dataList?.length) {
    for (const chunk of dataList) {
      const values = chunk.children?.[0]?.values;
      const length = chunk.length;
      if (values && length) {
        const stride = chunk.type?.listSize || Math.max(2, Math.round(values.length / length));
        chunks.push({values, stride, start, end: start + length});
      }
      start += length || 0;
    }
  }

  if (chunks.length === 1) {
    const chunk = chunks[0];
    return {
      length: vector.length,
      read(index, out) {
        const base = index * chunk.stride;
        const lng = chunk.values[base];
        const lat = chunk.values[base + 1];
        if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
          return false;
        }
        out[0] = lng;
        out[1] = lat;
        return true;
      }
    };
  }

  if (chunks.length > 1) {
    return {
      length: vector.length,
      read(index, out) {
        for (let c = 0; c < chunks.length; c++) {
          const chunk = chunks[c];
          if (index >= chunk.start && index < chunk.end) {
            const base = (index - chunk.start) * chunk.stride;
            const lng = chunk.values[base];
            const lat = chunk.values[base + 1];
            if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
              return false;
            }
            out[0] = lng;
            out[1] = lat;
            return true;
          }
        }
        return false;
      }
    };
  }

  return {
    length: vector.length,
    read(index, out) {
      const point = readPointLngLat(vector.get?.(index));
      if (!point) {
        return false;
      }
      out[0] = point[0];
      out[1] = point[1];
      return true;
    }
  };
}
