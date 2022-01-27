import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '../test-utils';
import Login from './Login';

test('Inputs should be initially empty', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInputEl = screen.getByLabelText('Email');
  const passwordInputEl = screen.getByLabelText('Password');

  expect(emailInputEl.value).toBe('');
  expect(passwordInputEl.value).toBe('');
});
