import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './components/TaskList';
import TaskSingle from './components/TaskSingle';
import GlobalStyle from './components/styles/Global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/task' />} />
          <Route path='/task' element={<MainTemplate />}>
            <Route path='' element={<TaskList />} />
            <Route path=':id' element={<TaskSingle />} />
          </Route>
          <Route path='/users/login' element={<Login />} />
          <Route path='/user/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
