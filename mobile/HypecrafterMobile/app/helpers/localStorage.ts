import { persistReducer } from 'redux-persist'; // It`s needed for below import to work properly
import storage from 'redux-persist/lib/storage';
import { StorageKeys } from '../common/enums/storage-keys';

const setToLocalStorage = (field: string) => (value: string) => storage.setItem(field, value);
const getFromLocalStorage = (field: string) => storage.getItem(field);
const removeFromLocalStorage = (field: string) => storage.removeItem(field);

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

