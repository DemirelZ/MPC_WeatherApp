// themeFromMain: picks accent colors from weather[0].main (Clear, Clouds, Rain...)
// This is no longer used in the app, but kept for reference
/* This function was created to determine the background color based on the weather, but it was not used. It may be used in the future. */

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
