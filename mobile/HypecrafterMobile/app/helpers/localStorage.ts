import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../common/enums/storage-keys';

const setToLocalStorage = (field: string) => (value: string) => AsyncStorage.setItem(field, value);
const getFromLocalStorage = (field: string) => AsyncStorage.getItem(field);
const removeFromLocalStorage = (field: string) => AsyncStorage.removeItem(field);

const setAccessToken = setToLocalStorage(StorageKeys.ACCESS_TOKEN);
const setRefreshToken = setToLocalStorage(StorageKeys.REFRESH_TOKEN);

const getAccessToken = () => getFromLocalStorage(StorageKeys.ACCESS_TOKEN);
const getRefreshToken = () => getFromLocalStorage(StorageKeys.REFRESH_TOKEN);

const removeTokens = () => {
  removeFromLocalStorage(StorageKeys.ACCESS_TOKEN);
  removeFromLocalStorage(StorageKeys.REFRESH_TOKEN);
};

export {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeTokens
};

