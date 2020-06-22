import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from 'common/container'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {error: null, errorInfo: null}
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const {errorInfo, error} = this.state
    if (errorInfo) {
      return (
        <Container>
          <h1>Something went wrong.</h1>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </Container>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
