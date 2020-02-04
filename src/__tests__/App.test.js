import React from 'react';
import {render} from '@testing-library/react';
import App from '../App';

test('should render hello', () => {
    const {getByText} = render(<App />);
    const heading = getByText(/hello world/i);
});