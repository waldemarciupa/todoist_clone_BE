import axios from 'axios';
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  const api = axios.create({
    baseURL: 'https://my-todoist-clone.herokuapp.com',
  });
}

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export default api;
