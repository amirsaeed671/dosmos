import React, {useState} from 'react';
import Proptypes from 'prop-types';

const Form = ({onSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({username, password});
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={handleUsernameChange} data-testid="username" id="username" name="username" aria-labelledby="username" placeholder="Username"/>
            <input type="password" value={password} onChange={handlePasswordChange} data-testid="password" id="password" name="password" aria-labelledby="password" placeholder="Password"/>
            <button type="submit" aria-labelledby="submit" data-testid="submit-button">Submit</button>
        </form>
    );
}

Form.propTypes = {
    onSubmit: Proptypes.func.isRequired,
};

export default Form;