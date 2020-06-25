import React, {useContext, useState} from 'react'
import Proptypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import './login.css'
import Container from 'common/container'
import UserService from 'user'
import {setUser} from 'auth'
import Notification from 'notification-provider'
import Form from './form'
import {loginObservable} from './observables'

const Login = ({history}) => {
  const [loader, setLoader] = useState(false)
  const {addNotification} = useContext(Notification)
  const observer = {
    next: ({message, token}) => {
      setUser(token)
      addNotification(message, 'success')
      history.push('home')
    },
    error: err => {
      addNotification(err.message, 'error')
      setLoader(false)
    },
  }
  const handleSubmit = (data = {username: '', password: ''}) => {
    setLoader(true)
    loginObservable(UserService.login(data)).subscribe(observer)
  }

  return (
    <Container>
      <div className="login">
        <Form loader={loader} onSubmit={handleSubmit} />
      </div>
    </Container>
  )
}

Login.propTypes = {
  history: Proptypes.object.isRequired,
}

export default withRouter(Login)
