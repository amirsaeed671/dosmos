import React from 'react'
import Proptypes from 'prop-types'
import {BrowserRouter, Route} from 'react-router-dom'
import {render as renderUtils} from '@testing-library/react'

function TestComp() {
    return <div>Test Login</div>
}

function Router({children}) {
    return (
        <BrowserRouter>
            <Route path="/" component={TestComp} />
            {children}
        </BrowserRouter>
    )
}

Router.propTypes = {
    children: Proptypes.node.isRequired
}


const render = (ui, options) => {
    return renderUtils(ui, {
      wrapper: Router,
      ...options
    })
}

export * from '@testing-library/react'
export {render}