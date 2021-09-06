import Config from "react-native-config";

export const env = {
  server: {
    url: Config.REACT_APP_SERVER_URL || 'http://hypecrafter2-env.eba-n3gbu5mb.us-west-2.elasticbeanstalk.com/api'
  }
};
