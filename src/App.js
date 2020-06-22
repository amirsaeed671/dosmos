import React, {useRef} from 'react'
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
import NotificationSystem from 'react-notification-system'
import Notification from 'notification-provider'
import ErrorBoundary from 'ErrorBoundary'

const App = () => {
  const notificationSystem = useRef()

  const addNotification = (
    message = 'Notification Message',
    level = 'success',
  ) => {
    const notification = notificationSystem.current
    notification.addNotification({
      autoDismiss: 3,
      message,
      level,
    })
  }

  return (
    <ErrorBoundary>
      <Notification.Provider value={{addNotification}}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Layout />
            <Redirect to="/" />
          </Switch>
        </Router>
        <NotificationSystem ref={notificationSystem} />
      </Notification.Provider>
    </ErrorBoundary>
  )
}

export default App
