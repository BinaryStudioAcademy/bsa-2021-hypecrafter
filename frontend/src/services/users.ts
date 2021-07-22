export const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());

