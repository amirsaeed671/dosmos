import React from 'react'
import './App.css'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
import Login from 'login'
import Signup from 'signup'
import Layout from 'layout'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Layout />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
