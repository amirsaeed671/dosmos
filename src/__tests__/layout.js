import React from 'react'
import {Redirect, BrowserRouter as Router} from 'react-router-dom'
import Layout from 'layout'
import {waitFor} from '@testing-library/dom'
import {render, act} from '@testing-library/react'
import UserService from 'user'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Redirect: jest.fn(() => null),
  Switch: jest.fn(props => props.children),
  Route: jest.fn(() => null),
}))

jest.mock('navbar', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}))

jest.mock('user', () => ({
  __esModule: true,
  default: {
    profile: jest.fn(),
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})

test('it should redirect to login if unauthenticated', async () => {
  UserService.profile.mockRejectedValueOnce({})
  await act(async () => {
    const {container} = render(<Layout />, {wrapper: Router})

    await waitFor(() => {
      expect(Redirect).toHaveBeenCalledTimes(1)
      expect(Redirect).toHaveBeenCalledWith({to: '/'}, {})
    })
    expect(UserService.profile).toHaveBeenCalledTimes(1)
    expect(window.location.pathname).toBe('/')
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})

test('it should redirect to home if authenticated', () => {
  UserService.profile.mockResolvedValueOnce({})
  const {container} = render(<Layout />, {
    wrapper: Router,
  })

  expect(UserService.profile).toHaveBeenCalledTimes(1)
  expect(Redirect).toHaveBeenCalledTimes(0)
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="layout"
        data-testid="layout"
      >
        <div
          class="container"
        />
      </div>
    </div>
  `)
})
