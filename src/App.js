import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Container from 'container';
import Login from 'login';

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </Container>
  )
}

export default App;
