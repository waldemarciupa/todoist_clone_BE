import { StyledLogin, LoginBox } from '../components/styles/Login.styled';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';

const Login = () => {
  return (
    <>
      <StyledLogin>
        <LoginBox>
          <img src='/images/todoist-logo.svg' />
          <h2>Log in</h2>
          <Label>Email</Label>
          <Input />
          <Label>Password</Label>
          <Input type='password' mb='20px' />
          <Button primary>Log in</Button>
        </LoginBox>
      </StyledLogin>
    </>
  );
};

export default Login;
