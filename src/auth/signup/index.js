/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './signup.css';
import Container from 'common/container';
import Form from './form';

const Signup = ({history}) => {

    const handleSubmit = ({username, password}) => {  
        history.push('/login');
    };

    return (
        <Container>
            <div className="signup">
                <Form onSubmit={handleSubmit} />
            </div>
        </Container>
    )
}

Signup.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(Signup);