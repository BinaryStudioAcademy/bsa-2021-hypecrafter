import queryString from 'query-string';
import { HttpHeader, HttpMethod, HttpStatusCode } from '../common/enums';
import { RequestArgs } from '../common/types';
import { env } from '../env';
import Storage from '../storage';
import { StorageKeys } from './../common/enums/storage-keys';

type HeadersInit = Headers | string[][] | Record<string, string>;

const refreshToken = async () => {
  // TODO...
  const data = 'Some data';
  return data;
};

export const logout = async () => {
  const refreshToken = await Storage.get(StorageKeys.REFRESH_TOKEN);
  if (refreshToken) {
    const url = getUrl(HttpMethod.POST, { url: 'auth/token/reject' });
    const options = getOptions(HttpMethod.POST, { url, params: { refreshToken } });
    await fetch(url, options);
  }
  await Storage.remove(StorageKeys.REFRESH_TOKEN);
  await Storage.remove(StorageKeys.ACCESS_TOKEN);
};

const getInitHeaders = (
  hasContent = false,
  contentType = 'application/json'
) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set(HttpHeader.CONTENT_TYPE, contentType);
  }

  const token = Storage.get(StorageKeys.ACCESS_TOKEN);
  if (token) {
    headers.set(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
  }

  return headers;
};

const getOptions = (method: HttpMethod, { params }: RequestArgs) => {
  const isBodyExist = params && method !== HttpMethod.GET;

  const headers = getInitHeaders(isBodyExist);
  const body = isBodyExist ? { body: JSON.stringify(params) } : { };

  return {
    method,
    headers,
    ...body
  };
};

const getUrlWithQuery = (
  url: string, query?: Record<string, any>
): string => `${url}${query ? `?${queryString.stringify(query)}` : ''}`;

const getUrl = (method: HttpMethod, { url, params, config }: RequestArgs): string => {
  if (config?.isExternal) {
    if (params && method === HttpMethod.GET) {
      return getUrlWithQuery(url, params);
    }

    return url;
  }

  const fullUrl = `${env.server.url}/${url}`;

  if (params && method === HttpMethod.GET) {
    return getUrlWithQuery(fullUrl, params);
  }

  return fullUrl;
};

const makeRequest = (method: HttpMethod) => async <T>(args: RequestArgs) => {
  const url = getUrl(method, args);
  const options = getOptions(method, args);

  let result = await fetch(url, options);

  if (result.status === HttpStatusCode.UNAUTHORIZED) {
    const refreshTokenResponse = await refreshToken();

    if (refreshTokenResponse) {
      result = await fetch(url, options);
    } else {
      logout();
    }
  }

  return result.json() as Promise<T>;
};

export const api = {
  get: makeRequest(HttpMethod.GET),
  post: makeRequest(HttpMethod.POST),
  delete: makeRequest(HttpMethod.DELETE),
  put: makeRequest(HttpMethod.PUT)
};
