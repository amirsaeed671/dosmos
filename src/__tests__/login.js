import React from 'react';
import Form from 'login/form';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('it should change the form inputs and submit the form with data', async () => {
    const handleSubmit = jest.fn(() => {});

    const {getByTestId} = render(<Form onSubmit={handleSubmit} />);
    const submitButton = getByTestId('submit-button');
    const userNameInput = getByTestId('username');
    const passwordInput = getByTestId('password');

    await userEvent.type(userNameInput, 'abid');
    await userEvent.type(passwordInput, '1234');
    fireEvent.click(submitButton);


    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({username: 'abid', password: '1234'});
    expect(submitButton).toHaveTextContent('Submit');
    expect(userNameInput.value).toBe('abid');
    expect(passwordInput.value).toBe('1234');
});
