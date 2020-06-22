import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import './signup.css'
import Container from 'common/container'
import {from} from 'rxjs'
import {tap, catchError, pluck, takeWhile} from 'rxjs/operators'
import UserService from 'user'
import {setUser} from 'auth'
import Notification from 'notification-provider'
import Form from './form'

const Signup = ({history}) => {
  const {addNotification} = useContext(Notification)
  const handleSubmit = (data = {username: '', password: ''}) => {
    from(UserService.signup(data))
      .pipe(
        tap(response => {
          addNotification(response.message)
        }),
        takeWhile(({status}) => status === 200),
        pluck('data', 'token'),
        tap(token => {
          setUser(token)
          history.push('home')
        }),
        catchError(err => {
          addNotification(err.toJSON().message, 'warning')
        }),
      )
      .subscribe()
  }

  return (
    <Container>
      <div className="signup">
        <Form onSubmit={handleSubmit} />
      </div>
    </Container>
  )
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Signup)
