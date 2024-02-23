import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'machine_statuses',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
