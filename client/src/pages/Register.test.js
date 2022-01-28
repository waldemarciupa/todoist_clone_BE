import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '../test-utils';
import Register from './Register';

const setup = () =>
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

describe('Register test', () => {
  test('inputs should be initially empty', () => {
    setup();
    expect(screen.getByLabelText('Name').value).toBe('');
    expect(screen.getByLabelText('Email').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
  });
});
