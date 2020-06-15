import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
// import * as JsDOM from '@testing-library/jest-dom/extend-expect';

// expect.extend(JsDOM);

test('should render hello', () => {
  const { container, getByTestId } = render(<App />);
  const heading = getByTestId('heading');
  expect(heading).toHaveTextContent('Hello World');
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h1
        data-testid="heading"
      >
        Hello World
      </h1>
    </div>
  `);
});
