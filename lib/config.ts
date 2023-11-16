import { Platform } from "react-native";

export type CoffeeNavConfig = {
  API_HOST: string,
  API_PORT: string,
}

type CoffeeNavEnvConfig = {
  apiWebHost: string,
  apiWebPort: string,
  apiAndroidHost: string,
  apiAndroidPort: string,
  apiIosHost: string,
  apiIosPort: string,
};

const devConfig: CoffeeNavEnvConfig = {
  apiWebHost: 'localhost',
  apiWebPort: '8080',
  apiAndroidHost: '10.0.2.2',
  apiAndroidPort: '8080',
  apiIosHost: '10.0.2.2',
  apiIosPort: '8080',
};

const prodConfig: CoffeeNavEnvConfig = {
  apiWebHost: '?',
  apiWebPort: '?',
  apiAndroidHost: '?',
  apiAndroidPort: '?',
  apiIosHost: '?',
  apiIosPort: '?',
};

function getConfig(): CoffeeNavConfig {
  let envConfig = __DEV__ ? devConfig : prodConfig;

  switch (Platform.OS) {
    case 'android':
      return {
        API_HOST: envConfig.apiAndroidHost,
        API_PORT: envConfig.apiAndroidPort,
      }

    case 'ios':
      return {
        API_HOST: envConfig.apiIosHost,
        API_PORT: envConfig.apiIosPort,
      }

    default:
      return {
        API_HOST: envConfig.apiWebHost,
        API_PORT: envConfig.apiWebPort,
      }
  }
}

export default getConfig();
