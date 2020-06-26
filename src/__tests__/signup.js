import React from 'react'
import Form from 'signup/form'
import Signup from 'signup'
import userEvent from '@testing-library/user-event'
import {axe} from 'jest-axe'
import {render} from 'auth-test-utils'
import UserService from 'user'

jest.mock('user', () => ({
  __esModule: true,
  default: {
    signup: jest.fn(),
  },
}))

test('it should handle the resonse of the api', async () => {
  UserService.signup.mockResolvedValueOnce({
    data: {
      token: 'dummyToken',
    },
    message: 'User successfully created',
    status: 201,
  })

  const {getByLabelText, getByRole, findByRole} = render(<Signup />)
  const usernameInput = getByLabelText(/username/i)
  const passwordInput = getByLabelText(/password/i)

  await userEvent.type(usernameInput, 'abid')
  await userEvent.type(passwordInput, '12345678')

  userEvent.click(getByRole('button'))
  expect(getByRole('button')).toBeDisabled()
  const button = await findByRole('button')
  expect(button).not.toBeDisabled()
  expect(UserService.signup).toHaveBeenCalledWith({
    username: 'abid',
    password: '12345678',
  })
  expect(UserService.signup).toHaveBeenCalledTimes(1)
  expect(sessionStorage.token).toBe('dummyToken')
})

test('it should change the form inputs and submit the form with data', async () => {
  const handleSubmit = jest.fn()

  const {getByTestId} = render(<Form onSubmit={handleSubmit} />)
  const submitButton = getByTestId('submit-button')
  const backToLogin = getByTestId('back-to-login')
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
  expect(submitButton).toHaveTextContent(/signup/i)
  expect(backToLogin).toHaveTextContent(/back to login/i)
  expect(userNameInput.value).toBe('abid')
  expect(passwordInput.value).toBe('1234')
})

test('form should be accessible', async () => {
  const handleSubmit = jest.fn()
  const {container} = render(<Form onSubmit={handleSubmit} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
