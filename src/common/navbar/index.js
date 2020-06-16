import React from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';
import Container from 'container';
import Rocket from './assets/rocket.svg';
import './navbar.css';

const Navbar = ({list}) => {
    return (
        <div className="navbar">
            <Container>
                <div className="navbar-list-container">
                    <img alt="rocket" aria-labelledby="rocket" src={Rocket} />
                    <div className="navbar-list">
                        {
                            list.map(({title, key, path}) => (
                                <Link key={key} to={path} className="navbar-list-item">{title}</Link>
                            ))
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
};

Navbar.propTypes = {
    list: Proptypes.array.isRequired
}

export default Navbar;