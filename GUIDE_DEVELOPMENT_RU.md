# Руководство по запуску kepler.gl в режиме разработки

## Обзор

Kepler.gl - это веб-приложение на основе WebGL для визуализации больших объемов геолокационных данных в браузере. Проект использует монорепозиторий с Yarn workspaces и требует Node.js версии 18.18.2.

## Требования

### Обязательные зависимости

1. **Node.js ^18.x** (рекомендуется 18.18.2)
   - Используйте [nvm](https://github.com/nvm-sh/nvm) для управления версиями Node.js
   - Или [nvm-windows](https://github.com/coreybutler/nvm-windows) для Windows

2. **Yarn 4.4.0**
   - Устанавливается автоматически через Volta или вручную

3. **Volta** (опционально, но рекомендуется)
   - Автоматически управляет версиями Node.js и Yarn
   - Unix/MacOS: `curl https://get.volta.sh | bash`
   - Windows: `winget install Volta.Volta`

4. **Git** - для клонирования репозитория

### Переменные окружения

Для работы приложения необходимы следующие переменные окружения:

- `MapboxAccessToken` - токен доступа к Mapbox API (обязательно)
- `MapboxExportToken` - токен для экспорта (опционально)
- `DropboxClientId` - ID клиента Dropbox (опционально)
- `CartoClientId` - ID клиента Carto (опционально)
- `FoursquareClientId`, `FoursquareDomain`, `FoursquareAPIURL`, `FoursquareUserMapsURL` - для интеграции с Foursquare (опционально)

## Пошаговая инструкция по установке

### 1. Клонирование репозитория

```bash
git clone git@github.com:keplergl/kepler.gl.git
cd kepler.gl
```

### 2. Установка Node.js

```bash
# Установка правильной версии Node.js для проекта
nvm install

# Использование установленной версии
nvm use

# Включение Yarn через corepack
corepack enable
```

### 3. Установка зависимостей

```bash
# Установка Puppeteer (для тестов)
yarn dlx puppeteer

# Установка JavaScript зависимостей
yarn install

# Инициализация подмодулей и установка зависимостей для всех workspace
yarn bootstrap
```

Команда `bootstrap` выполняет:
- Инициализацию git submodules
- Установку всех зависимостей через `yarn install`
- Исправление зависимостей через `yarn fix-dependencies`

### 4. Настройка переменных окружения

#### Windows (PowerShell):
```powershell
$env:MapboxAccessToken="ваш_токен_mapbox"
$env:MapboxExportToken="ваш_токен_экспорта"
$env:DropboxClientId="ваш_dropbox_client_id"
$env:CartoClientId="ваш_carto_client_id"
```

#### Linux/MacOS:
```bash
export MapboxAccessToken=ваш_токен_mapbox
export MapboxExportToken=ваш_токен_экспорта
export DropboxClientId=ваш_dropbox_client_id
export CartoClientId=ваш_carto_client_id
```

**Важно:** Минимально необходим только `MapboxAccessToken` для базовой работы приложения.

### 5. Запуск в режиме разработки

#### Основной способ - демо-приложение:

```bash
yarn start
```

Эта команда:
- Устанавливает зависимости для примера `demo-app` (если нужно)
- Запускает локальный dev-сервер
- Открывает приложение на `http://localhost:8080/`

#### Альтернативные способы запуска:

1. **С загрузкой deck.gl из исходников:**
   ```bash
   yarn start:deck
   ```

2. **С загрузкой deck.gl из параллельной папки:**
   ```bash
   yarn start:deck-src
   ```

3. **С загрузкой loaders.gl из исходников:**
   ```bash
   yarn start:loaders-src
   ```

4. **Запуск других примеров:**
   ```bash
   yarn start:custom-map-style    # Пример с кастомными стилями карты
   yarn start:yandex-tiles-api    # Подложка Яндекс Tiles API вместо Mapbox
   yarn start:custom-theme       # Пример с кастомной темой
   yarn start:custom-reducer      # Пример с кастомным reducer
   yarn start:replace-component   # Пример с заменой компонентов
   yarn start:open-modal          # Пример с модальным окном
   yarn start:node-app            # Node.js приложение
   ```

5. **Запуск через HTTPS:**
   ```bash
   yarn start:https
   ```

6. **Запуск для E2E тестов:**
   ```bash
   yarn start:e2e
   ```

## Структура проекта

Проект использует **Yarn workspaces** и состоит из следующих модулей:

- `src/types` - типы TypeScript
- `src/constants` - константы
- `src/common-utils` - общие утилиты
- `src/utils` - утилиты
- `src/styles` - стили
- `src/localization` - локализация
- `src/deckgl-layers` - слои deck.gl
- `src/table` - таблицы
- `src/layers` - слои
- `src/schemas` - схемы
- `src/cloud-providers` - провайдеры облачных хранилищ
- `src/processors` - процессоры данных
- `src/tasks` - задачи
- `src/actions` - Redux actions
- `src/effects` - side effects
- `src/reducers` - Redux reducers
- `src/components` - React компоненты
- `src/duckdb` - интеграция с DuckDB
- `src/ai-assistant` - AI ассистент

## Полезные команды

### Разработка

```bash
# Запуск демо-приложения
yarn start

# Сборка проекта
yarn build

# Сборка UMD версии
yarn build:umd

# Сборка типов TypeScript
yarn build:types
```

### Тестирование

```bash
# Запуск всех тестов
yarn test

# Быстрые тесты (без форматированного вывода)
yarn test-fast

# Тесты Node.js
yarn test-node

# Тесты браузера (jsdom)
yarn test-browser

# Headless браузер тесты
yarn test-headless

# Тесты в Chromium с отладкой
yarn test-browser-drive

# Покрытие кода
yarn cover
```

### Линтинг и форматирование

```bash
# Линтинг кода
yarn lint

# Линтинг CSS
yarn lint:css

# Проверка TypeScript
yarn typescript

# Форматирование всех файлов
yarn prettier-all
```

### Документация

```bash
# Генерация документации
yarn docs

# TypeDoc документация
yarn typedoc
```

### Очистка

```bash
# Удаление всех node_modules и артефактов сборки
yarn clean
```

## Разработка веб-сайта

Для разработки официального веб-сайта kepler.gl:

```bash
# Установка зависимостей для веб-сайта
yarn install:web

# Запуск веб-сайта
yarn start:web

# Или одной командой
yarn web
```

**Важно:** Не забудьте установить `MapboxAccessToken` перед запуском.

## Решение проблем

### Проблема: Ошибки при установке зависимостей

**Решение:**
```bash
# Очистка и переустановка
yarn clean
yarn install
yarn bootstrap
```

### Проблема: Ошибки с Node.js версией

**Решение:**
```bash
# Убедитесь, что используете правильную версию
nvm install 18.18.2
nvm use 18.18.2
node --version  # должно быть v18.18.2
```

### Проблема: Ошибки с Yarn

**Решение:**
```bash
# Включите corepack
corepack enable

# Или установите Yarn 4.4.0 вручную
npm install -g yarn@4.4.0
```

### Проблема: Ошибки с Mapbox токеном

**Решение:**
- Убедитесь, что переменная окружения `MapboxAccessToken` установлена
- Получите токен на [mapbox.com](https://www.mapbox.com)
- Проверьте, что токен экспортирован в текущей сессии терминала

### Проблема: Ошибки при запуске на Windows

**Решение:**
- Рекомендуется использовать WSL (Windows Subsystem for Linux)
- Или используйте Git Bash вместо PowerShell для некоторых команд
- Убедитесь, что установлены все необходимые инструменты сборки

## Дополнительная информация

- **Документация разработчика:** `contributing/DEVELOPERS.md`
- **Примеры:** `examples/` - различные примеры использования kepler.gl
- **Основной README:** `README.md` - общая информация о проекте

## Полезные ссылки

- [Официальный сайт](http://kepler.gl)
- [Демо-приложение](http://kepler.gl/#/demo)
- [Документация](https://docs.kepler.gl/)
- [GitHub репозиторий](https://github.com/keplergl/kepler.gl)
