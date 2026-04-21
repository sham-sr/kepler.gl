// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {LOCALES} from '../locales';

export default {
  property: {
    weight: 'вес',
    label: 'ярлык',
    fillColor: 'цвет заливки',
    color: 'цвет',
    coverage: 'покрытие',
    strokeColor: 'цвет обводки',
    radius: 'радиус',
    outline: 'контур',
    stroke: 'обводка',
    density: 'плотность',
    height: 'высота',
    sum: 'сумма',
    pointCount: 'Кол-во точек'
  },
  placeholder: {
    search: 'Поиск',
    selectField: 'Выберите поле',
    yAxis: 'Y Ось',
    selectType: 'Выберите A тип',
    selectValue: 'Выберите A значение',
    enterValue: 'Введите значение',
    empty: 'пустой',
    selectLayer: 'Выберите слой'
  },
  misc: {
    by: '',
    valuesIn: 'Значение в',
    valueEquals: 'Значение равно',
    dataSource: 'Источник данных',
    brushRadius: 'Радиус кисти (km)',
    empty: ' '
  },
  mapLayers: {
    title: 'Слои карты',
    label: 'Обозначения',
    road: 'Дороги',
    border: 'Границы',
    building: 'Здания',
    water: 'Вода',
    land: 'Земля',
    '3dBuilding': '3d здания',
    background: 'Фон'
  },
  panel: {
    text: {
      label: 'Ярлык',
      labelWithId: 'Ярлык {labelId}',
      fontSize: 'Размер шрифта',
      fontColor: 'Цвет шрифта',
      backgroundColor: 'Цвет фона',
      textAnchor: 'Анкор текста',
      alignment: 'Положение',
      addMoreLabel: 'Добавить еще ярлык',
      outlineWidth: 'Ширина контура',
      outlineColor: 'Цвет контура'
    }
  },
  sidebar: {
    panels: {
      layer: 'Слои',
      filter: 'Фильтры',
      interaction: 'Взаимодействия',
      basemap: 'Базовая карта'
    },
    panelViewToggle: {
      list: 'Список',
      byDataset: 'По набору данных'
    }
  },
  layer: {
    required: 'Требования*',
    columnModesSeparator: 'Или',
    radius: 'Радиус',
    color: 'Цвет',
    fillColor: 'Цвет заливки',
    outline: 'Контур',
    weight: 'Вес',
    propertyBasedOn: '{property} на основе',
    coverage: 'Покрытие',
    stroke: 'Обводка',
    strokeWidth: 'Ширина обводки',
    strokeColor: 'Цвет обводки',
    basic: 'Базовый',
    trailLength: 'Длина следа',
    trailLengthDescription: 'Кол-во секунд для полного исчезновения пути',
    newLayer: 'новый слой',
    elevationByDescription: 'При выключении высота основана на кол-ве точек',
    colorByDescription: 'При выключении цвет основан на кол-ве точек',
    aggregateBy: 'Агрегировать {field} по',
    '3DModel': '3D Модель',
    '3DModelOptions': 'Параметры 3D модели',
    service: 'Сервис',
    layer: 'Слой',
    appearance: 'Внешний вид',
    uniqueIdField: 'Поле уникального ID',
    type: {
      point: 'точки',
      arc: 'дуги',
      line: 'линии',
      grid: 'сетка',
      hexbin: 'hexbin',
      polygon: 'многоугольники',
      geojson: 'geojson',
      cluster: 'кластеры',
      icon: 'значки',
      heatmap: 'тепловая карта',
      hexagon: 'шестиугольник',
      hexagonid: 'H3',
      trip: 'пути',
      s2: 'S2',
      '3d': '3D',
      vectortile: 'векторная плитка',
      rastertile: 'растровая плитка',
      wms: 'WMS',
      tile3d: '3D плитка'
    },
    wms: {
      hover: 'Значение:'
    },
    layerUpdateError:
      'Ошибка при обновлении слоя: {errorMessage}. Убедитесь, что формат входных данных корректен.',
    interaction: 'Взаимодействие',
    heatmap: 'Тепловая карта',
    aggregation: 'Агрегация'
  },
  layerVisConfigs: {
    strokeWidth: 'Ширина штриха (в пикселях)',
    strokeWidthRange: 'Диапазон ширины штриха',
    radius: 'Радиус',
    fixedRadius: 'Фиксированный радиус в метрах',
    fixedRadiusDescription:
      'Сопоставьте радиус с абсолютным радиусом в метрах, например От 5 до 5 метров',
    radiusRange: 'Диапазон радиуса',
    clusterRadius: 'Радиус кластера в пикселях',
    radiusRangePixels: 'Диапазон радиуса в пикселях',
    opacity: 'Непрозрачность',
    coverage: 'Покрытие',
    outline: 'Контур',
    colorRange: 'Цветовая гамма',
    stroke: 'Обводка',
    strokeColor: 'Цвет обводки',
    strokeColorRange: 'Обводка Цветовой диапазон',
    targetColor: 'Целевой цвет',
    colorAggregation: 'Цветовая агрегация',
    heightAggregation: 'Агрегация по высоте',
    weightAggregation: 'Weight Aggregation',
    resolutionRange: 'Диапазон разрешения',
    sizeScale: 'Шкала размеров',
    worldUnitSize: 'Мировые ед.изм.',
    elevationScale: 'Шкала возвышения',
    enableElevationZoomFactor: 'Использовать коэффициент увеличения по высоте',
    enableElevationZoomFactorDescription:
      'Отрегулируйте высоту / возвышение на основе текущего коэффициента масштабирования',
    enableHeightZoomFactor: 'вкл. коэффициент масштабирования по высоте',
    heightScale: 'Масштаб высоты',
    coverageRange: 'Диапазон покрытия',
    highPrecisionRendering: 'Высокая точность рендеринга',
    highPrecisionRenderingDescription: 'Высокая точность приведет к снижению производительности',
    height: 'Высота',
    heightDescription: 'Нажмите кнопку в правом верхнем углу карты, чтобы переключиться в 3D-вид',
    fill: 'Наполнить',
    enablePolygonHeight: 'Включить высоту многоугольника',
    showWireframe: 'Показать каркас',
    weightIntensity: 'Вес Интенсивность',
    intensity: 'Intensity',
    threshold: 'Threshold',
    zoomScale: 'Масштаб увеличения',
    heightRange: 'Диапазон высоты',
    heightMultiplier: 'Множитель высоты',
    fixedHeight: 'Фиксированная высота',
    fixedHeightDescription: 'Использовать высоту без изменений',
    allowHover: 'Показать подсказку',
    allowHoverDescription: 'Показать или скрыть подсказку при наведении на элементы слоя',
    showNeighborOnHover: 'Выделять соседей при наведении',
    showHighlightColor: 'Показать цвет выделения',
    darkModeEnabled: 'Темная базовая карта',
    transparentBackground: 'Прозрачный фон',
    billboard: 'Билборд',
    billboardDescription: 'Ориентировать геометрию к камере',
    fadeTrail: 'Затухание следа'
  },
  layerManager: {
    addData: 'Добавить данные',
    addLayer: 'Добавить слой',
    layerBlending: 'Смешивание слоев',
    overlayBlending: 'Смешивание наложений'
  },
  mapManager: {
    mapStyle: 'Стиль карты',
    addMapStyle: 'Добавить стиль карты',
    '3dBuildingColor': '3D Цвет здания',
    backgroundColor: 'Цвет фона'
  },
  effectManager: {
    effects: 'Эффекты',
    addEffect: 'Добавить эффект',
    pickDateTime: 'Выбрать дату/время',
    currentTime: 'Текущее время',
    pickCurrrentTime: 'Выбрать текущее время',
    date: 'Дата',
    time: 'Время',
    timezone: 'Часовой пояс'
  },
  layerConfiguration: {
    defaultDescription: 'Рассчитать {property} на основе выбранного поля',
    howTo: 'Как',
    showColorChart: 'Показать цветовую схему',
    hideColorChart: 'Скрыть цветовую схему'
  },
  filterManager: {
    addFilter: 'Добавить фильтр',
    timeFilterSync: 'Синхр. наборы данных',
    timeLayerSync: 'Связать с таймлайном слоя',
    timeLayerUnsync: 'Отвязать от таймлайна слоя',
    column: 'Столбец'
  },
  datasetTitle: {
    showDataTable: 'Показать таблицу данных ',
    removeDataset: 'Удалить набор данных'
  },
  datasetInfo: {
    rowCount: '{rowCount} строк',
    vectorTile: 'Векторная плитка',
    rasterTile: 'Растровая плитка',
    wmsTile: 'WMS плитка'
  },
  tooltip: {
    hideLayer: 'скрыть слой',
    showLayer: 'показать слой',
    hideFeature: 'Скрыть функцию',
    showFeature: 'Показать функцию',
    hide: 'скрыть',
    show: 'показать',
    removeLayer: 'Удалить слой',
    duplicateLayer: 'Дублировать слой',
    layerSettings: 'Настройки слоя',
    closePanel: 'Закрыть текущую панель',
    switchToDualView: 'Перейти в режим двойной карты',
    showLegend: 'Показать легенду',
    disable3DMap: 'Отключить 3D Карту',
    DrawOnMap: 'Рисовать на карте',
    selectLocale: 'Выберите регион',
    showAiAssistantPanel: 'Показать панель AI Assistant',
    hideAiAssistantPanel: 'Скрыть панель AI Assistant',
    hideLayerPanel: 'Скрыть панель слоев',
    showLayerPanel: 'Показать панель слоев',
    moveToTop: 'Перейти к верхним слоям данных',
    selectBaseMapStyle: 'Выберите стиль базовой карты',
    removeBaseMapStyle: 'Удалить стиль базовой карты',
    delete: 'Удалить',
    timePlayback: 'Воспроизведение времени',
    timeFilterSync: 'Синхр. со столбцом из другого набора',
    cloudStorage: 'Облачное хранилище',
    '3DMap': '3D Карта',
    animationByWindow: 'Перемещение временного окна',
    animationByIncremental: 'Инкрементальное временное окно',
    speed: 'скорость',
    play: 'проиграть',
    pause: 'пауза',
    reset: 'перезапустить',
    export: 'экспорт',
    timeLayerSync: 'Связать с таймлайном слоя',
    timeLayerUnsync: 'Отвязать от таймлайна слоя',
    syncTimelineStart: 'Начало текущего периода фильтра',
    syncTimelineEnd: 'Конец текущего периода фильтра',
    showEffectPanel: 'Показать панель эффектов',
    hideEffectPanel: 'Скрыть панель эффектов',
    removeEffect: 'Удалить эффект',
    disableEffect: 'Отключить эффект',
    effectSettings: 'Настройки эффекта',
    zoomToLayer: 'Приблизить к слою',
    resetAfterError: 'Попытаться включить слой после ошибки'
  },
  toolbar: {
    exportImage: 'Экспорт изображения',
    exportData: 'Экспорт данных',
    exportMap: 'Экспорт карты',
    shareMapURL: 'Поделиться URL карты',
    saveMap: 'Сохранить карту',
    select: 'Выбрать',
    polygon: 'Многоугольник',
    rectangle: 'Прямоугольник',
    hide: 'Скрыть',
    show: 'Показать',
    ...LOCALES
  },
  editor: {
    filterLayer: 'Слои фильтров',
    filterLayerDisabled: 'Немногоугольные геометрии нельзя использовать для фильтрации',
    copyGeometry: 'Копировать геометрию',
    noLayersToFilter: 'Нет слоев для фильтрации'
  },

  modal: {
    title: {
      deleteDataset: 'Удалить набор данных',
      addDataToMap: 'Добавить данные на карту',
      exportImage: 'Экспорт изображения',
      exportData: 'Экспорт данных',
      exportMap: 'Экспорт карты',
      addCustomMapboxStyle: 'Добавить собственный стиль карты',
      saveMap: 'Сохранить карту',
      shareURL: 'Поделиться URL',
      shareMap: 'Поделиться картой'
    },
    button: {
      delete: 'Удалить',
      download: 'Скачать',
      export: 'Экспортировать',
      addStyle: 'Добавить стиль',
      save: 'Сохранить',
      defaultCancel: 'Отменить',
      defaultConfirm: 'Подтвердить'
    },
    exportImage: {
      ratioTitle: 'Ratio',
      ratioDescription: 'Выберите соотношение для различного использования',
      ratioOriginalScreen: 'Исходный экран',
      ratioCustom: 'Настройки',
      ratio4_3: '4:3',
      ratio16_9: '16:9',
      resolutionTitle: 'Разрешение',
      resolutionDescription: 'Для печати лучше использовать высокое разрешение',
      resolutionPlaceholder: 'Выберите разрешение...',
      mapLegendTitle: 'Легенда карты',
      mapLegendAdd: 'Добавить легенду на карту'
    },
    exportData: {
      datasetTitle: 'Набор данных',
      datasetSubtitle: 'Выберите наборы данных, которые хотите экспортировать',
      allDatasets: 'Все',
      dataTypeTitle: 'Тип данных',
      dataTypeSubtitle: 'Выберите тип данных, которые вы хотите экспортировать',
      filterDataTitle: 'Фильтрация данных',
      filterDataSubtitle: 'Вы можете выбрать экспорт исходных данных или отфильтрованных данных',
      filteredData: 'Отфильтрованные данные',
      unfilteredData: 'Нефильтрованные данные',
      fileCount: '{fileCount} Файлов',
      rowCount: '{rowCount} Строк',
      tiledDatasetWarning: '* Экспорт данных для плиточных наборов не поддерживается'
    },
    deleteData: {
      warning: 'вы собираетесь удалить этот набор данных. Это повлияет на {length} слоев'
    },
    addStyle: {
      publishTitle:
        '2. Если вы указали URL-адрес файла mapbox на шаге 1, опубликуйте свой стиль на mapbox или предоставьте токен доступа. (Необязательно)',
      publishSubtitle1: 'Вы можете создать свой собственный стиль карты',
      publishSubtitle2: 'и',
      publishSubtitle3: 'опубликовать',
      publishSubtitle4: 'его.',
      publishSubtitle5: 'Чтобы использовать частный стиль, вставьте свой',
      publishSubtitle6: 'token доступа',
      publishSubtitle7:
        'прим. kepler.gl - это клиентское приложение, данные остаются в вашем браузере .',
      exampleToken: 'например pk.abcdefg.xxxxxx',
      pasteTitle: '1. Вставить URL стиля',
      pasteSubtitle0: 'URL стиля может быть mapbox',
      pasteSubtitle1: 'Что такое',
      pasteSubtitle2: 'URL стиля',
      pasteSubtitle3: 'или style.json используя',
      pasteSubtitle4: 'Mapbox GL Style Spec',
      namingTitle: '3. Назови свой стиль'
    },
    shareMap: {
      title: 'Поделиться картой',
      shareUriTitle: 'Поделиться URL карты',
      shareUriSubtitle: 'Создать URL карты, чтобы поделиться с другими',
      cloudTitle: 'Облачное хранилище',
      cloudSubtitle: 'Войдите и загрузите данные карты в свое личное облачное хранилище',
      shareDisclaimer:
        'kepler.gl сохранит данные вашей карты в вашем личном облачном хранилище, только люди с URL-адресом могут получить доступ к вашей карте и данным. ' +
        'Вы можете редактировать / удалить файл данных в своей облачной учетной записи в любое время.',
      gotoPage: 'Перейти на страницу Kepler.gl {currentProvider}'
    },
    statusPanel: {
      mapUploading: 'Загрузка карты',
      error: 'Ошибка'
    },
    saveMap: {
      title: 'Облачное хранилище',
      subtitle: 'Авторизуйтесь, чтобы сохранить карту в вашем личном облачном хранилище'
    },
    exportMap: {
      formatTitle: 'Формат карты',
      formatSubtitle: 'Выберите формат для экспорта карты',
      html: {
        selection: 'Экспорт карты в интерактивный файл HTML.',
        tokenTitle: 'Токен доступа к Mapbox',
        tokenSubtitle: 'Используйте свой токен доступа Mapbox в html(необязательно)',
        tokenPlaceholder: 'Вставьте токен доступа Mapbox',
        tokenMisuseWarning:
          '* Если вы не предоставите свой токен, карта может не отображаться в любое время, когда мы заменим наш, чтобы избежать неправильного использования. ',
        tokenDisclaimer: 'Вы можете изменить токен Mapbox позже, следуя инструкциям: ',
        tokenUpdate: 'Как обновить существующий токен карты.',
        modeTitle: 'Режим карты',
        modeSubtitle1: 'Выберите режим приложения. Подробнее',
        modeSubtitle2: 'Информация',
        modeDescription: 'Разрешить пользователям {mode} карту',
        read: 'чтение',
        edit: 'редактирование'
      },
      json: {
        configTitle: 'Конфигурация карты',
        configDisclaimer:
          'Конфигурация карты будет включена в файл Json. Если вы используете kepler.gl в своем собственном приложении. Вы можете скопировать этот конфиг и передать его ',
        selection:
          'Экспорт текущих данных карты и конфигурации в один файл Json. Позже вы сможете открыть ту же карту, загрузив этот файл на kepler.gl.',
        disclaimer:
          '* Конфигурация карты связана с загруженными наборами данных. DataId используется для привязки слоев, фильтров и всплывающих подсказок к определенному набору данных. ' +
          'При передаче этой конфигурации addDataToMap, убедитесь, что идентификатор набора данных совпадает с dataId / s в этой конфигурации.'
      }
    },
    loadingDialog: {
      loading: 'Загрузка...'
    },
    loadData: {
      upload: 'Загрузить файлы',
      tileset: 'Плиточный набор',
      storage: 'Загрузить из хранилища'
    },
    tripInfo: {
      title: 'Создать поездки из GeoJson',
      titleTable: 'Создать поездки из списка точек',
      description1: `Для анимации пути данные GeoJSON должны содержать \`LineString\` в геометрии объекта, а координаты в LineString должны иметь 4 элемента в форматах
${'```json'}
[долгота, широта, высота, метка времени]
${'```'}
3-й элемент - это метка времени. Допустимые форматы меток времени включают unix в секундах, например \`1564184363\` или в миллисекундах, например \`1564184363000\`.`,
      descriptionTable1:
        'Поездки можно создать, объединив список точек по широте и долготе, отсортировав по меткам времени и сгруппировав по уникальным id.',
      example: 'Пример GeoJSON',
      exampleTable: 'Пример Csv'
    },
    polygonInfo: {
      title: 'Создать слой многоугольников из GeoJSON объекта',
      titleTable: 'Создать путь из точек',
      description: `Многоугольник можно создать из
__1 .Коллекция объектов GeoJSON__
__2. CSV содержит столбец геометрии__

### 1. Создать многоугольник из GeoJSON файла

При загрузке GeoJSON файла, содержащего FeatureCollection, слой многоугольников будет создан автоматически

Пример GeoJSON
${'```json'}
{
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [102.0, 0.5]
      },
      "properties": {
          "prop0": "value0"
      }
  }, {
      "type": "Feature",
      "geometry": {
          "type": "LineString",
          "coordinates": [
              [102.0, 0.0],
              [103.0, 1.0],
              [104.0, 0.0],
              [105.0, 1.0]
          ]
      },
      "properties": {
        "prop0": "value0"
      }
  }]
}
${'```'}

### 2. Создать многоугольник из столбца геометрии в CSV таблице
Геометрии (Многоугольники, Точки, Линии и т.д.) могут быть встроены в CSV как строка в формате \`GeoJSON\` или \`WKT\`.

#### 2.1 Строка \`GeoJSON\`
Пример data.csv со строкой \`GeoJSON\`
${'```txt'}
id,_geojson
1,"{""type"":""Polygon"",""coordinates"":[[[-74.158491,40.835947],[-74.157914,40.83902]]]}"
${'```'}

#### 2.2 Строка \`WKT\`
Пример data.csv со строкой \`WKT\`
[Well-Known Text (WKT)](https://dev.mysql.com/doc/refman/5.7/en/gis-data-formats.html#gis-wkt-format) представление значений геометрии предназначено для обмена данными геометрии в ASCII формате.

Пример data.csv с WKT
${'```txt'}
id,_geojson
1,"POLYGON((0 0,10 0,10 10,0 10,0 0),(5 5,7 5,7 7,5 7, 5 5))"
${'```'}
`,
      descriptionTable: `Пути можно создать, объединив список точек по широте и долготе, отсортировав по полю индекса (например, метке времени) и сгруппировав по уникальным id.

  ### Столбцы слоя:
  - **id**: - *обязательно*&nbsp;- Столбец \`id\` используется для группировки точек. Точки с одинаковым id будут объединены в один путь.
  - **lat**: - *обязательно*&nbsp;- Широта точки
  - **lon**: - *обязательно*&nbsp;- Долгота точки
  - **alt**: - *опционально*&nbsp;- Высота точки
  - **sort by**: - *опционально*&nbsp;- Столбец \`sort by\` используется для сортировки точек, если не указан, точки будут отсортированы по индексу строки.
`,
      exampleTable: 'Пример CSV'
    },
    iconInfo: {
      title: 'Как рисовать значки',
      description1:
        'В вашем csv создайте столбец, поместите в него имя значка, который вы хотите нарисовать. Вы можете оставить ячейку пустой, если не хотите, чтобы значок отображался для некоторых точек. Когда столбец назван',
      code: 'icon',
      description2: ' kepler.gl автоматически создаст для вас слой значков.',
      example: 'Пример:',
      icons: 'Значки'
    },
    storageMapViewer: {
      lastModified: 'Последнее изменение {lastUpdated} назад',
      back: 'Назад'
    },
    overwriteMap: {
      title: 'Сохранение карты...',
      alreadyExists: 'уже существует в вашем {mapSaved}. Хотите его перезаписать?'
    },
    loadStorageMap: {
      back: 'Назад',
      goToPage: 'Перейти на страницу Kepler.gl {displayName}',
      storageMaps: 'Хранилище / Карты',
      noSavedMaps: 'Нет сохраненных карт',
      foursquareStorageMessage:
        'Здесь отображаются только карты, сохраненные через Kepler.gl > Сохранить > Хранилище Foursquare'
    }
  },
  header: {
    visibleLayers: 'Видимые слои',
    layerLegend: 'Легенда слоя'
  },
  interactions: {
    tooltip: 'Подсказка',
    brush: 'Кисть',
    coordinate: 'Координаты',
    geocoder: 'Геокодер'
  },
  layerBlending: {
    title: 'Смешивание слоев',
    additive: 'добавление',
    normal: 'нормальное',
    subtractive: 'вычитание'
  },
  overlayBlending: {
    title: 'Смешивание наложений карты',
    description: 'Смешать слои с базовой картой, чтобы оба были видны.',
    screen: 'темная базовая карта',
    normal: 'нормальное',
    darken: 'светлая базовая карта'
  },
  columns: {
    title: 'Столбцы',
    lat: 'lat',
    lng: 'lng',
    altitude: 'высота',
    alt: 'высота',
    id: 'id',
    timestamp: 'время',
    icon: 'значок',
    geojson: 'geojson',
    geoarrow: 'geoarrow',
    geoarrow0: 'источник geoarrow',
    geoarrow1: 'цель geoarrow',
    token: 'token',
    sortBy: 'сортировать по',
    neighbors: 'соседи',
    arc: {
      lat0: 'широта источника или hex id',
      lng0: 'долгота источника или hex id',
      lat1: 'широта цели или hex id',
      lng1: 'долгота цели или hex id'
    },
    line: {
      alt0: 'высота источника',
      alt1: 'высота цели'
    },
    grid: {
      worldUnitSize: 'Размер сетки (km)'
    },
    hexagon: {
      worldUnitSize: 'Радиус шестиугольника (km)'
    },
    hex_id: 'hex id'
  },
  color: {
    customPalette: 'Своя палитра',
    steps: 'Шаги',
    type: 'Тип',
    colorBlindSafe: 'Безопасно для дальтоников',
    reversed: 'Обратить',
    disableStepReason: `Нельзя изменить кол-во шагов с пользовательскими цветовыми разрывами, используйте свою палитру для редактирования шагов`,
    preset: 'Предустановленные цвета',
    picker: 'Выбор цвета'
  },
  scale: {
    colorScale: 'Цветовая шкала',
    sizeScale: 'Масштаб размера',
    strokeScale: 'Масштаб штриха',
    strokeColorScale: 'Масштаб цвета штриха',
    scale: 'Масштаб'
  },
  fileUploader: {
    message: 'Перетащите сюда ваши файлы',
    chromeMessage:
      '*Пользователь Chrome: ограничьте размер файла до 250 МБ, если нужно загрузить файл большего размера, попробуйте Safari',
    disclaimer:
      '*kepler.gl - это клиентское приложение без серверной части. Данные живут только на вашем компьютере. ' +
      'Никакая информация или данные карты не отправляются ни на один сервер.',
    configUploadMessage:
      'Загрузите {fileFormatNames} или сохраненную карту **Json**. Подробнее [**supported file formats**]',
    browseFiles: 'просмотреть файлы',
    uploading: 'Загрузка',
    fileNotSupported: 'Файл {errorFiles} не поддерживается.',
    or: 'или'
  },
  tilesetSetup: {
    header: 'Настройка векторных плиток',
    rasterTileHeader: 'Настройка растровых плиток',
    addTilesetText: 'Добавить плиточный набор'
  },
  geocoder: {
    title: 'Введите адрес или координаты, например 37.79,-122.40'
  },
  fieldSelector: {
    clearAll: 'Очистить все',
    formatting: 'Форматирование'
  },
  compare: {
    modeLabel: 'Режим сравнения',
    typeLabel: 'Тип сравнения',
    types: {
      absolute: 'Абсолютный',
      relative: 'Относительный'
    }
  },
  mapPopover: {
    primary: 'Первичный'
  },
  density: 'плотность',
  'Bug Report': 'Отчет об ошибках',
  'User Guide': 'Инструкции',
  Save: 'Сохранить',
  Share: 'Поделиться',
  'Update color': 'Обновить цвет',
  dataTable: {
    displayFormat: {
      setIntegerNumberFormat: 'Формат целых чисел',
      setFloatNumberFormat: 'Формат дробных чисел',
      setTimestampFormat: 'Формат даты и времени',
      setDateFormat: 'Формат даты',
      setBooleanFormat: 'Формат логических значений'
    }
  },
  mapLegend: {
    layers: {
      line: {
        singleColor: {
          sourceColor: 'Источник',
          targetColor: 'Цель'
        }
      },
      arc: {
        singleColor: {
          sourceColor: 'Источник',
          targetColor: 'Цель'
        }
      },
      point: {
        singleColor: {
          color: 'Цвет заливки',
          strokeColor: 'Контур'
        }
      },
      default: {
        singleColor: {
          color: 'Цвет заливки',
          strokeColor: 'Контур',
          sourceColor: 'Источник',
          targetColor: 'Цель'
        }
      }
    }
  }
};
