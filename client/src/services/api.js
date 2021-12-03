import axios from 'axios';

if (process.env.NODE_ENV === 'production') {
  const api = axios.create({
    baseURL: 'https://my-todoist-clone.herokuapp.com',
  });

  return api;
}

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export default api;
