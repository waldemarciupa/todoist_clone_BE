import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

let api;

if (process.env.NODE_ENV === 'production') {
  api = axios.create({
    baseURL: 'https://my-todoist-clone.herokuapp.com',
    headers: {
      user: user.token,
      user_id: user.id,
    },
  });
} else {
  api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      user: user.token,
      user_id: user.id,
    },
  });
}

export default api;
