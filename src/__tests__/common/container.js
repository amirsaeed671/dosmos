import React from 'react'
import {render} from '@testing-library/react'
import Container from 'common/container'

test('container snapshot should match', () => {
  const {container} = render(
    <Container>
      <div />
    </Container>,
  )

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div />
      </div>
    </div>
  `)
})
