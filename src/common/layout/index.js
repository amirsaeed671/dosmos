import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {privateRoutes} from 'private-routes'
import Navbar from 'navbar'
import Container from 'common/container'

const Layout = () => {
  return (
    <div className="layout">
      <Navbar list={privateRoutes} />
      <Container>
        <Switch>
          {privateRoutes.map(({path, component, key}) => (
            <Route key={key} path={path} component={component} />
          ))}
        </Switch>
      </Container>
    </div>
  )
}

export default Layout
