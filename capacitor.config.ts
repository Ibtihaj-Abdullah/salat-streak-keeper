import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bda9d0bff3024d4f828768448f448cb8',
  appName: 'salat-streak-keeper',
  webDir: 'dist',
  server: {
    url: 'https://bda9d0bf-f302-4d4f-8287-68448f448cb8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1e3a8a",
      showSpinner: false
    }
  }
};

export default config;