import { api } from '../helpers';

export const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());

export const getUser = (id: string) => api.get({ url: `users/${id}` });
