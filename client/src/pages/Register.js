import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { StyledLogin, LoginForm } from '../components/styles/Login.styled';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';
import Error from '../components/Error';
import HelpBlock from '../components/HelpBlock';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.post('/user/register', {
        name,
        email,
        password,
      });

      const user = data.user || false;
      const user_id = data.user_id || false;

      if (user && user_id) {
        localStorage.setItem('user', user);
        localStorage.setItem('user_id', user_id);
        navigate('/');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <StyledLogin onSubmit={handleSubmit}>
        <LoginForm>
          <img alt='logo' src='/images/todoist-logo.svg' />
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

export default Register;
