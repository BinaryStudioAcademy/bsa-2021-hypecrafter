import queryString from 'query-string';
import { HttpMethod, HttpHeader, HttpStatusCode } from '../common/enums';
import { RequestArgs } from '../common/types';
import { getEnv } from './env';

const refreshToken = async () => {
  // TODO...
  const data = 'Some data';
  return data;
};

const logout = async () => {
  // TODO...
  const data = 'Some data';
  return data;
};

const getInitHeaders = (
  hasContent = true,
  contentType = 'application/json'
) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set(HttpHeader.CONTENT_TYPE, contentType);
  }

  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    headers.set(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
  }

  return headers;
};

const getOptions = (method: HttpMethod, { params }: RequestArgs) => {
  const isBodyExist = params && method !== HttpMethod.GET;

  const headers = getInitHeaders(isBodyExist);
  const body = isBodyExist ? { body: JSON.stringify(params) } : {};

  return {
    method,
    headers,
    ...body
  };
};

const getUrlWithQuery = (url: string, query?: Record<string, string>)
  : string => `${url}${query ? `?${queryString.stringify(query)}` : ''}`;

const getUrl = (method: HttpMethod, { url, params, config }: RequestArgs): string => {
  if (config?.external) {
    if (params && method === HttpMethod.GET) {
      return getUrlWithQuery(`${getEnv('REACT_APP_SERVER_URL')}/${url}`, params);
    }

    return `${getEnv('REACT_APP_SERVER_URL')}/${url}`;
  }

  if (params && method === HttpMethod.GET) {
    return getUrlWithQuery(url, params);
  }

  return url;
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
