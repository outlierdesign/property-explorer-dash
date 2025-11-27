import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0e9f229aca234098a777631ba8fa2156',
  appName: 'property-explorer-dash',
  webDir: 'dist',
  server: {
    url: 'https://0e9f229a-ca23-4098-a777-631ba8fa2156.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
