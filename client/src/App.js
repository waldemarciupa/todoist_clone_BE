import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyles from './components/styles/Global';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Route path='/' exact component={Home} />
      <Route path='/login' component={Login} />
    </Router>
  );
}

export default App;
