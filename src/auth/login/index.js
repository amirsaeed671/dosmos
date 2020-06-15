/* eslint-disable no-unused-vars */
import React from 'react';
import Form from './form';

const Login = () => {

    const handleSubmit = ({username, password}) => {  
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} />
        </div>
    )
}

export default Login;