import React from 'react'
import { connect } from 'react-redux'
import { checkLogin } from '../actions/auth'
import NavBar from './NavBar.jsx'

// default view for the app
// see /src/routes for routes for this.props.children
class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  render() {
    return(
      // navbar persists throughout the whole app
      <div>
        <NavBar />
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  checkLogin: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

export default App = connect(null, mapDispatchToProps)(App)

