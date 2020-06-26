import React from 'react'
import Form from 'login/form'
import Login from 'login'
import userEvent from '@testing-library/user-event'
import {axe} from 'jest-axe'
import {render} from 'auth-test-utils'
import {removeUser} from 'auth'
import UserService from 'user'

jest.mock('user', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
  },
}))

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
  const {getByLabelText, getByTestId, findByRole} = render(<Login />)
  const usernameInput = getByLabelText(/username/i)
  const passwordInput = getByLabelText(/password/i)
  const submitButton = getByTestId('submit-button')

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

  const {getByTestId} = render(<Form onSubmit={handleSubmit} />)
  const submitButton = getByTestId('submit-button')
  const signupButton = getByTestId('signup-button')
  const userNameInput = getByTestId('username')
  const passwordInput = getByTestId('password')

  await userEvent.type(userNameInput, 'abid')
  await userEvent.type(passwordInput, '1234')
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'abid',
    password: '1234',
  })
  expect(submitButton).toHaveTextContent(/login/i)
  expect(signupButton).toHaveTextContent(/signup/i)
  expect(userNameInput.value).toBe('abid')
  expect(passwordInput.value).toBe('1234')
})

test('form should be accessible', async () => {
  const handleSubmit = jest.fn(() => {})
  const {container} = render(<Form onSubmit={handleSubmit} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
