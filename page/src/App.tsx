import React from 'react';
import './App.css';
import Home from './pages/home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginLayout from './layout/login'
import Login from './pages/login'

function App() {
  return (
    <div className="App">
      <header>

      </header>
      <RouterWrap />
    </div>
  );
}

function RouterWrap() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/' exact render={() =>
          <LoginLayout>
            <Route path='/' component={Home} />
          </LoginLayout>
        } />
      </Switch>
    </Router>
  )
}

export default App;
