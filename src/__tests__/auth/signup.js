import React from 'react'
import Form from 'signup/form'
import Signup from 'auth/signup'
import userEvent from '@testing-library/user-event'
import {axe} from 'jest-axe'
import {render as renderRTL} from 'auth-test-utils'
import UserService from 'user'

jest.mock('user', () => ({
  __esModule: true,
  default: {
    signup: jest.fn(),
  },
}))

function render(ui, options) {
  const utils = renderRTL(ui, options)
  const usernameInput = utils.getByLabelText(/username/i)
  const passwordInput = utils.getByLabelText(/password/i)
  const submitButton = utils.getByTestId('submit-button')
  const backToLogin = utils.getByTestId('back-to-login')

  return {
    ...utils,
    usernameInput,
    passwordInput,
    submitButton,
    backToLogin,
  }
}

test('it should handle the resonse of the api', async () => {
  UserService.signup.mockResolvedValueOnce({
    data: {
      token: 'dummyToken',
    },
    message: 'User successfully created',
    status: 201,
  })

  const {usernameInput, passwordInput, findByRole, getByRole} = render(
    <Signup />,
  )

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

  const {submitButton, backToLogin, usernameInput, passwordInput} = render(
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
  expect(submitButton).toHaveTextContent(/signup/i)
  expect(backToLogin).toHaveTextContent(/back to login/i)
  expect(usernameInput.value).toBe('abid')
  expect(passwordInput.value).toBe('1234')
})

test('form should be accessible', async () => {
  const handleSubmit = jest.fn()
  const {container} = render(<Form onSubmit={handleSubmit} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
