import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { StyledLogin, LoginForm } from '../components/styles/Login.styled';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Error from '../components/Error';
import HelpBlock from '../components/HelpBlock';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { email, password }
      );

      const user = data.name;
      const user_id = data._id;

      if (user && user_id) {
        localStorage.setItem('user', user);
        localStorage.setItem('user_id', user_id);
        history.push('/');
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
          <img alt='logo' src='/images/todoist-logo.svg' />
          <h2>Log in</h2>
          <Error>{error ? error : ''}</Error>
          <Label>Email</Label>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            type='email'
          />
          <Label>Password</Label>
          <Input
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            mb='20px'
          />
          <Button primary>Log in</Button>
          <HelpBlock />
        </LoginForm>
      </StyledLogin>
    </>
  );
};

export default Login;
