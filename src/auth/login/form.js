import React, {useState} from 'react'
import Proptypes from 'prop-types'
import {Link} from 'react-router-dom'

const Form = ({onSubmit}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({username, password})
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  return (
    <form
      className="form"
      autoComplete="on"
      aria-labelledby="form"
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>
      <input
        type="text"
        autoComplete="on"
        required
        value={username}
        onChange={handleUsernameChange}
        data-testid="username"
        id="username"
        name="username"
        aria-labelledby="username"
        placeholder="Username"
      />
      <input
        type="password"
        autoComplete="on"
        required
        value={password}
        onChange={handlePasswordChange}
        data-testid="password"
        id="password"
        name="password"
        aria-labelledby="password"
        placeholder="Password"
      />
      <div>
        <button
          className="button button-primary"
          type="submit"
          aria-labelledby="submit"
          data-testid="submit-button"
        >
          Login
        </button>
        <Link
          aria-labelledby="signup"
          className="button button-secondary"
          to="signup"
          data-testid="signup-button"
        >
          Signup
        </Link>
      </div>
    </form>
  )
}

Form.propTypes = {
  onSubmit: Proptypes.func.isRequired,
}

export default Form
