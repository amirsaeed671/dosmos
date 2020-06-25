import React from 'react'
import {render} from '@testing-library/react'
import ErrorBoundary from 'ErrorBoundary'
import PropTypes from 'prop-types'

function Bomb({shouldThrow}) {
  return shouldThrow ? new Error('💣') : <div />
}

Bomb.propTypes = {
  shouldThrow: PropTypes.bool,
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

test('error boundary should handle errors and show stack trace in browser', () => {
  const {container, rerender, getByTestId, queryByRole} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`<div />`)
  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  )
  expect(queryByRole('alert').textContent).toMatchInlineSnapshot(
    `"Something went wrong."`,
  )
  expect(container.firstChild).not.toBe(null)
  expect(getByTestId('error')).toBeInTheDocument()
})
