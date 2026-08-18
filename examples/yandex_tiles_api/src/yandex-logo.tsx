// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import * as React from 'react';
import {YANDEX_MAPS_HOME} from './yandex-style.ts';

const linkStyle: React.CSSProperties = {
  position: 'absolute',
  right: 8,
  bottom: 28,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  lineHeight: 0,
  textDecoration: 'none'
};

/**
 * Yandex Tiles API requires a clickable logo on the map, linking to Yandex Maps.
 * Official logo assets: https://yandex.ru/maps-api/docs/tiles-api/index.html
 */
export default function YandexLogo() {
  return (
    <a
      href={YANDEX_MAPS_HOME}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Яндекс Карты"
      style={linkStyle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="88"
        height="24"
        viewBox="0 0 88 24"
        role="img"
        aria-hidden="true"
      >
        <rect width="88" height="24" rx="2" fill="#fff" fillOpacity="0.9" />
        <text
          x="8"
          y="17"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="14"
          fontWeight="700"
          fill="#000"
        >
          Яндекс
        </text>
      </svg>
    </a>
  );
}
