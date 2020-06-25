import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import './signup.css'
import Container from 'common/container'
import UserService from 'user'
import {setUser} from 'auth'
import Notification from 'notification-provider'
import Form from './form'
import {signupObservable} from './observables'

const Signup = ({history}) => {
  const [loader, setLoader] = useState(false)
  const {addNotification} = useContext(Notification)
  const observer = {
    next: ({message, token}) => {
      addNotification(message, 'success')
      setUser(token)
      history.push('home')
    },
    error: err => {
      addNotification(err, 'error')
      setLoader(false)
    },
  }
  const handleSubmit = (data = {username: '', password: ''}) => {
    setLoader(true)
    signupObservable(UserService.signup(data)).subscribe(observer)
  }

  return (
    <Container>
      <div className="signup">
        <Form loader={loader} onSubmit={handleSubmit} />
      </div>
    </Container>
  )
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Signup)
