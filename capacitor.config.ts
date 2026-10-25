import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.phantom.call',
  appName: 'Phantom Call',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
