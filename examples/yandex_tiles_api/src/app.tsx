// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import * as React from 'react';
import {useState, useEffect} from 'react';
import KeplerGl from '@kepler.gl/components';
import {initApplicationConfig} from '@kepler.gl/utils';

import YandexLogo from './yandex-logo.tsx';
import {HAS_YANDEX_TILES_KEY, YANDEX_MAPS_TERMS} from './yandex-style.ts';

initApplicationConfig({
  enableAnnotations: false,
  enableGlobeView: false
});

function useWindowSize() {
  const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});
  useEffect(() => {
    const onResize = () => setSize({width: window.innerWidth, height: window.innerHeight});
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

const missingKeyBannerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 20,
  padding: '10px 16px',
  background: '#FC3F1D',
  color: '#fff',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: 13
};

const App = () => {
  const {width, height} = useWindowSize();
  return (
    <div style={{position: 'relative', width, height}}>
      {!HAS_YANDEX_TILES_KEY ? (
        <div style={missingKeyBannerStyle}>
          Set <code>YandexTilesApiKey</code> in <code>.env</code> (repo root or this example) and
          restart. Get a key at{' '}
          <a
            href="https://developer.tech.yandex.ru/"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: '#fff'}}
          >
            developer.tech.yandex.ru
          </a>
          . Usage is subject to the{' '}
          <a
            href={YANDEX_MAPS_TERMS}
            target="_blank"
            rel="noopener noreferrer"
            style={{color: '#fff'}}
          >
            Yandex Maps terms
          </a>
          .
        </div>
      ) : null}
      <KeplerGl mapboxApiAccessToken="" id="map" width={width} height={height} />
      <YandexLogo />
    </div>
  );
};

export default App;
