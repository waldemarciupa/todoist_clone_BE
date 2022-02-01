import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const userHeaders = user
  ? {
      user: user.token,
      user_id: user.id,
    }
  : {};

let api;

if (process.env.NODE_ENV === 'production') {
  api = axios.create({
    baseURL: 'https://my-todoist-clone.herokuapp.com',
    headers: userHeaders,
  });
} else {
  api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: userHeaders,
  });
}

export default api;
