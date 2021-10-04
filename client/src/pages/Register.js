import { useState } from 'react';
import axios from 'axios';
import { StyledLogin, LoginForm } from '../components/styles/Login.styled';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Error from '../components/Error';
import HelpBlock from '../components/HelpBlock';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        { name, email, password }
      );

      setErrorMessage(data.message);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <StyledLogin onSubmit={handleSubmit}>
        <LoginForm>
          <img src='/images/todoist-logo.svg' />
          <h2>Sign up</h2>
          <Error>{errorMessage ? errorMessage : ''}</Error>
          <Label>Name</Label>
          <Input
            onChange={(event) => setName(event.target.value)}
            type='text'
          />
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
          <Button primary>Sign up</Button>
          <HelpBlock register />
        </LoginForm>
      </StyledLogin>
    </>
  );
};

export default Login;
