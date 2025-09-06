export interface WeatherApiResponse {
  name: string;
  weather: { description: string; icon: string; main?: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  sys: { country: string };
}
