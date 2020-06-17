/* eslint-disable no-unused-vars */
import React from 'react'
import Proptypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import './login.css'
import Container from 'common/container'
import Form from './form'

const Login = ({history}) => {
  const handleSubmit = ({username, password}) => {
    history.push('/home')
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
