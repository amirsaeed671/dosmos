import React, {useContext} from 'react'
import Proptypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import './login.css'
import Container from 'common/container'
import UserService from 'user'
import {setUser} from 'auth'
import {from} from 'rxjs'
import {tap, catchError, pluck, takeWhile} from 'rxjs/operators'
import Notification from 'notification-provider'
import Form from './form'

const Login = ({history}) => {
  const {addNotification} = useContext(Notification)
  const handleSubmit = (data = {username: '', password: ''}) => {
    from(UserService.login(data))
      .pipe(
        tap(response => {
          addNotification(response.message, 'success')
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
      <div className="login">
        <Form onSubmit={handleSubmit} />
      </div>
    </Container>
  )
}

Login.propTypes = {
  history: Proptypes.object.isRequired,
}

export default withRouter(Login)
