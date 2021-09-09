import Config from "react-native-config";

type ProcessEnvKey =
  | 'REACT_APP_SERVER_URL';

export const getEnv = (key: ProcessEnvKey) => Config[key];
