import {BrowserRouter as Router} from 'react-router-dom'
import {render as renderUtils} from '@testing-library/react'

const render = (ui, options) => {
    return renderUtils(ui, {
      wrapper: Router,
      ...options
    })
}

export * from '@testing-library/react'
export {render}