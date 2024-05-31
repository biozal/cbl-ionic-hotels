import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'cbl-ionic-hotels',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "cblite-ionic": {}
  }
};

export default config;
