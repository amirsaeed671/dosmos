import React from 'react'
import UserService from 'user'
import {render} from 'layout-test-utils'
import {waitFor} from '@testing-library/dom'
import Layout from '../../common/layout'

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
  const {findByTestId, queryByTestId} = render(<Layout />)

  expect(UserService.profile).toHaveBeenCalledTimes(1)
  await findByTestId('layout')

  await waitFor(() => {
    expect(queryByTestId('layout')).toBe(null)
  })
})

test('it should  if authenticated', async () => {
  UserService.profile.mockResolvedValueOnce({})
  const {container, findByTestId} = render(<Layout />)
  await waitFor(() => expect(UserService.profile).toHaveBeenCalledTimes(1))
  await findByTestId('layout')
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        Test Login
      </div>
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
