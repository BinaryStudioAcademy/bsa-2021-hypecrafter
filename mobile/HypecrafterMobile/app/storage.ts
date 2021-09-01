import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME_SPACE } from './common/constants';

const set = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`${APP_NAME_SPACE}@${key}`, value);
  } catch (e) {
    console.log(e);
  }
};

const get = async (key: string )=> {
  try {
    const value = await AsyncStorage.getItem(`${APP_NAME_SPACE}@${key}`);
    return value;
  } catch (e) {
    console.log(e);
  }
};

const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`${APP_NAME_SPACE}@${key}`);
    return true;
  } catch (exception) {
    return false;
  }
};

const Storage = {set, get, remove};

export default Storage;
