import { connect } from 'react-redux'
import { loginRequest, logoutSuccess } from '../../actions/auth'
import { NavBar } from '../../components'
import { browserHistory } from 'react-router'

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth
  return {
    isAuthenticated,
    profile,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => {
      dispatch(loginRequest())
    },
    onLogoutClick: () => {
      dispatch(logoutSuccess())
      browserHistory.push('/')
      location.reload()
    }
  }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBarContainer
