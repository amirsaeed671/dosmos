import React, {useEffect, useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {privateRoutes} from 'private-routes'
import Navbar from 'navbar'
import Container from 'common/container'
import UserService from 'user'

const Layout = () => {
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    UserService.profile().catch(() => {
      setAuth(false)
    })
  }, [])

  if (!auth) {
    return <Redirect to="/" />
  }

  return (
    <div data-testid="layout" className="layout">
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
