import React, {useState} from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';

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
        <form className="form" autoComplete="on" aria-labelledby="form" onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <input type="text" autoComplete="on" required value={username} onChange={handleUsernameChange} data-testid="username" id="username" name="username" aria-labelledby="username" placeholder="Username"/>
            <input type="password" autoComplete="on" required value={password} onChange={handlePasswordChange} data-testid="password" id="password" name="password" aria-labelledby="password" placeholder="Password"/>
            <div>
                <button className="button button-primary" type="submit" aria-labelledby="submit" data-testid="submit-button">Signup</button>
                <Link aria-labelledby="back-to-login" to="/" data-testid="back-to-login">Back to Login</Link>
            </div>
        </form>
    );
}

Form.propTypes = {
    onSubmit: Proptypes.func.isRequired,
};

export default Form;