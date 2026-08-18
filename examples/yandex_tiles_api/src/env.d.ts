// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HAS_YANDEX_TILES_KEY?: string;
    }
  }
}
