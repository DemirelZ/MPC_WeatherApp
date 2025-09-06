// WeatherApiResponse: subset of OpenWeather Current Weather API fields used in the app
export interface WeatherApiResponse {
  name: string;
  weather: { description: string; icon: string; main?: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
  };
  sys: { country: string; sunrise?: number; sunset?: number };
  wind?: { speed?: number; deg?: number; gust?: number };
  timezone?: number;
  dt?: number;
  visibility?: number;
}
