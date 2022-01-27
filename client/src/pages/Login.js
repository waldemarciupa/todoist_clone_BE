import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledLogin, LoginForm } from '../components/styles/Login.styled';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Error from '../components/Error';
import HelpBlock from '../components/HelpBlock';
import Disclaimer from '../components/Disclaimer';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.post(`/users/login`, { email, password });

      const user = data.user;
      const user_id = data.user_id || false;

      if (user && user_id) {
        localStorage.setItem('user', user);
        localStorage.setItem('user_id', user_id);
        navigate('/');
      }

      setError(data.message);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <StyledLogin onSubmit={handleSubmit}>
        <LoginForm>
          <img
            widt='92px'
            height='24px'
            alt='logo'
            src='/images/todoist-logo.svg'
          />
          <h2>Log in</h2>
          <Error>{error && error}</Error>
          <Label htmlFor='email'>Email</Label>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            id='email'
            name='email'
            value={email}
          />
          <Label htmlFor='password'>Password</Label>
          <Input
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            id='password'
            name='password'
            mb='20px'
            value={password}
          />
          <Button primary>Log in</Button>
          <HelpBlock />
        </LoginForm>
      </StyledLogin>
      <Disclaimer />
    </>
  );
};

export default Login;
