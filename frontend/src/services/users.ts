export const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());

export const getUser = (id: string) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  .then(response => response.json());
