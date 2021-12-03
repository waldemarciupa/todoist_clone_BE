import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './components/TaskList';
import TaskSingle from './components/TaskSingle';

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Redirect to='/task' />
      </Route>
      <Route path='/task'>
        <MainTemplate>
          <Route exact path='/task' component={TaskList} />
          <Route path='/task/:id' component={TaskSingle} />
        </MainTemplate>
      </Route>
      <Route path='/users/login' component={Login} />
      <Route path='/user/register' component={Register} />
    </Router>
  );
}

export default App;
