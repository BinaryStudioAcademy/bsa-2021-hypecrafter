import fetch from 'node-fetch';
import { HttpMethod } from '../common/enums';

export async function sendRequest(url: string,
  method: HttpMethod = HttpMethod.GET,
  body?: Record<string, string>,
  headers?: Record<string, string>) {
  try {
    const params = {
      method
    };
    const response = await fetch(url, method !== HttpMethod.GET ? {
      ...params,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...headers } } : params);
    const result = await response.json();
    return result;
  } catch (er) {
    console.log(er);
    return null;
  }
}
