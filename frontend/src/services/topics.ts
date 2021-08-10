export const getTopics = () => fetch('http://localhost:3001/topics').then(response => response.json());

