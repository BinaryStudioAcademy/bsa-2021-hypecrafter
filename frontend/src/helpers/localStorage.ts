import { StorageKeys } from '../common/enums/storage-keys';

const setToLocalStorage = (field: string) => (value: string) => localStorage.setItem(field, value);
const getFromLocalStorage = (field: string) => localStorage.getItem(field);
const removeFromLocalStorage = (field: string) => localStorage.removeItem(field);

const setAccessToken = setToLocalStorage(StorageKeys.ACCESS_TOKEN);
const setRefreshToken = setToLocalStorage(StorageKeys.REFRESH_TOKEN);

const getAccessToken = () => getFromLocalStorage(StorageKeys.ACCESS_TOKEN);
const getRefreshToken = () => getFromLocalStorage(StorageKeys.REFRESH_TOKEN);

const removeAccessToken = () => removeFromLocalStorage(StorageKeys.ACCESS_TOKEN);
const removeRefreshToken = () => removeFromLocalStorage(StorageKeys.REFRESH_TOKEN);

export {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken
};
