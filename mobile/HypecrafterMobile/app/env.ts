import Config from "react-native-config";

export const env = {
  server: {
    url: Config.REACT_APP_SERVER_URL || 'https://hypecrafter.com/api'
  }
};
