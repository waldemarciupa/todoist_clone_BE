import axios from 'axios';

let api;

if (process.env.NODE_ENV === 'production') {
  api = axios.create({
    baseURL: 'https://my-todoist-clone.herokuapp.com',
  });
} else {
  api = axios.create({
    baseURL: 'http://localhost:8000',
  });
}

export default api;
