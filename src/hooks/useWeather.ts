import { useState, useCallback } from 'react';
import { getCurrentWeather } from '../services/weatherApi';
import type { WeatherApiResponse } from '../types/weather';

// Hook: manage weather data request state (loading, error, data)

export function useWeather() {
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await getCurrentWeather(city);
      setData(res);
    } catch (err: any) {
      if (err?.response?.status === 404) setError('City not found.');
      else setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeather };
}
