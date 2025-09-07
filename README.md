### Weather App (React Native CLI)

Small weather application using OpenWeather Current Weather API. Search is done inside a modal; successful results close the modal and render on the home screen. The UI is simple and clean.

### Features

- Search modal with a plus button trigger
- Current weather: temperature, description, icon
- More details: feels like, min/max, humidity, pressure, wind (speed + direction), visibility, sunrise/sunset
- Loading indicator and error handling (e.g., City not found.)
- English responses (API lang=en)

### Tech

- React Native 0.81, React 19
- Axios for HTTP
- Env handling via `react-native-dotenv` (`@env` import)
- `react-native-safe-area-context`, `react-native-linear-gradient`

### Requirements

- Node.js >= 20.19.4 (required by RN 0.81)
- Android SDK (Build-Tools 36, Platform 36)
- Xcode 16.1+ for iOS builds (optional for this task)

### Setup

1. Install dependencies

```sh
nvm use 20.19.4
npm install
```

2. Create .env with your OpenWeather key

```env
OPENWEATHER_API_KEY=your_api_key_here
```

- The app imports it with `import { OPENWEATHER_API_KEY } from '@env'`.
- After changing `.env`, restart Metro with reset-cache.

3. Start Metro (dev server)

```sh
npm start -- --reset-cache
```

4. Run on Android

```sh
# Start an emulator or connect a device, then:
npm run android
```

5. (Optional) Run on iOS

```sh
cd ios
bundle install
bundle exec pod install --repo-update
cd ..
npm run ios
```

Note: RN 0.81 requires Xcode 16.1+.

### API

- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Query: `?q={CITY}&appid={OPENWEATHER_API_KEY}&units=metric&lang=en`
- Used fields: name, sys.country, weather[0].{icon, description, main}, main.{temp, feels_like, temp_min, temp_max, humidity, pressure}, wind.{speed, deg}, visibility, sys.{sunrise, sunset}, timezone

### Project structure (src)

- `components/`: `SearchBar`, `SearchModal`, `HomeContent`, `Loader`, `ErrorBanner`, `EmptyState`
- `hooks/`: `useWeather`
- `services/`: `weatherApi.ts`
- `types/`: `weather.ts`
- `utils/`: `weatherTheme.ts`
- `theme/`: `constants.ts`

### Troubleshooting

- Metro error `(0, _util.styleText) is not a function`:
  - Use Node 20.19.4+, then reinstall deps and clear cache.
- LinearGradient native error (BVLinearGradient):
  - Stop Metro, `android/gradlew clean`, restart Metro with `--reset-cache`, `npm run android`.
- Port conflicts / stale caches:

```sh
lsof -ti :8081 | xargs -r kill -9
watchman watch-del-all || true
rm -rf $TMPDIR/metro-* $TMPDIR/haste-map-*
```

- iOS build fails on Xcode < 16.1:
  - Upgrade Xcode, then `bundle exec pod install`.

### Notes

- API key is bundled in the app when using `.env` replacement; prefer restricted keys.
- The app language is English; errors like “City not found.” are returned by the app, not the API.

### Short screens gif here

![](/screens.gif)
