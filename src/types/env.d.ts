declare global {
  // Minimal shape for process.env in React Native projects
  const process: {
    env: {
      OPENWEATHER_API_KEY?: string;
      [key: string]: string | undefined;
    };
  };
}

export {};

declare module '@env' {
  export const OPENWEATHER_API_KEY: string;
}
