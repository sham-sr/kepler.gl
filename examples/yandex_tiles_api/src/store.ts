// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import keplerGlReducer, {enhanceReduxMiddleware} from '@kepler.gl/reducers';

import {YANDEX_STYLE_ID, YANDEX_STYLE_ICON, createYandexMapStyle} from './yandex-style.ts';

const yandexStyle = {
  id: YANDEX_STYLE_ID,
  label: 'Yandex',
  url: '',
  icon: YANDEX_STYLE_ICON,
  layerGroups: [],
  colorMode: 'LIGHT',
  style: createYandexMapStyle()
};

const customizedKeplerGlReducer = keplerGlReducer.initialState({
  mapStyle: {
    mapStyles: {
      [YANDEX_STYLE_ID]: yandexStyle
    },
    styleType: YANDEX_STYLE_ID
  },
  mapState: {
    latitude: 55.751244,
    longitude: 37.618423,
    zoom: 10
  },
  uiState: {
    currentModal: null
  }
});

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer
});

const middlewares = enhanceReduxMiddleware([]);
const enhancers = applyMiddleware(...middlewares);

export default createStore(reducers, {}, compose(enhancers));
