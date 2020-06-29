import React from 'react'
import Form from 'login/form'
import Login from 'auth/login'
import userEvent from '@testing-library/user-event'
import {axe} from 'jest-axe'
import {render as renderRTL} from 'auth-test-utils'
import {removeUser} from 'auth'
import UserService from 'user'

jest.mock('user', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
  },
}))

function render(ui, options) {
  const utils = renderRTL(ui, options)
  const usernameInput = utils.getByLabelText(/username/i)
  const passwordInput = utils.getByLabelText(/password/i)
  const submitButton = utils.getByTestId('submit-button')
  const signupButton = utils.getByTestId('signup-button')

  return {
    ...utils,
    usernameInput,
    passwordInput,
    submitButton,
    signupButton,
  }
}

afterEach(() => {
  jest.resetAllMocks()
  removeUser()
})

test('it should handle the resonse of the api', async () => {
  UserService.login.mockResolvedValueOnce({
    data: {
      token: 'dummyToken',
    },
    message: 'User logged in',
    status: 200,
  })
  const {usernameInput, passwordInput, submitButton, findByRole} = render(
    <Login />,
  )

  await userEvent.type(usernameInput, 'abid')
  await userEvent.type(passwordInput, '12345678')

  userEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  // checking button to be enabled after api response comes
  const button = await findByRole('button')
  expect(button).not.toBeDisabled()
  expect(UserService.login).toHaveBeenCalledWith({
    username: 'abid',
    password: '12345678',
  })
  expect(sessionStorage.token).toBe('dummyToken')
  expect(UserService.login).toHaveBeenCalledTimes(1)
})

test('it should change the form inputs and submit the form with data', async () => {
  const handleSubmit = jest.fn(() => {})

  const {signupButton, submitButton, usernameInput, passwordInput} = render(
    <Form onSubmit={handleSubmit} />,
  )

  await userEvent.type(usernameInput, 'abid')
  await userEvent.type(passwordInput, '1234')
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'abid',
    password: '1234',
  })
  expect(submitButton).toHaveTextContent(/login/i)
  expect(signupButton).toHaveTextContent(/signup/i)
  expect(usernameInput.value).toBe('abid')
  expect(passwordInput.value).toBe('1234')
})

test('form should be accessible', async () => {
  const handleSubmit = jest.fn(() => {})
  const {container} = render(<Form onSubmit={handleSubmit} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
