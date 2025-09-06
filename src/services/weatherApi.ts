import axios from 'axios';
import type { WeatherApiResponse } from '../types/weather';
import { OPENWEATHER_API_KEY } from '@env';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Fetch current weather for a given city
export async function getCurrentWeather(
  city: string,
): Promise<WeatherApiResponse> {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
    city,
  )}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=tr`;
  const { data } = await axios.get<WeatherApiResponse>(url);
  return data;
}
