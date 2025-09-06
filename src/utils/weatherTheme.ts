// Simple theme selection using the “weather[0].main” field from the Weather API
export function themeFromMain(main?: string) {
  const key = (main || '').toLowerCase();
  if (key.includes('clear')) {
    return { accent: '#22d3ee', accentAlt: '#0ea5e9' }; // sunny
  }
  if (key.includes('cloud')) {
    return { accent: '#94a3b8', accentAlt: '#64748b' }; // cloudy
  }
  if (key.includes('rain') || key.includes('drizzle')) {
    return { accent: '#60a5fa', accentAlt: '#3b82f6' }; // rainy
  }
  if (key.includes('thunder')) {
    return { accent: '#f59e0b', accentAlt: '#ef4444' }; // thunderstorm
  }
  if (key.includes('snow')) {
    return { accent: '#e2e8f0', accentAlt: '#94a3b8' }; // snowy
  }
  return { accent: '#a78bfa', accentAlt: '#6366f1' }; // default
}
