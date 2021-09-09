import fetch from 'node-fetch';
import { HttpMethod } from '../common/enums';

export async function sendRequest(url: string,
  method: HttpMethod = HttpMethod.GET,
  body?: Record<string, string>,
  headers?: Record<string, string>) {
  try {
    const response = await fetch(url, {
      method,
      body: method !== HttpMethod.GET ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json', ...headers }
    });
    const result = await response.json();
    return result;
  } catch (er) {
    console.log(er);
    return null;
  }
}
