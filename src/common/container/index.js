import React from 'react';
import Proptypes from 'prop-types';
import './container.css';

const Container = ({children}) => {
    return (
        <div className="container">{children}</div>
    )
};

Container.propTypes = {
    children: Proptypes.node.isRequired
}

export default Container;