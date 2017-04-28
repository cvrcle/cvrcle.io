import { connect } from 'react-redux'
import { loginRequest, logoutSuccess } from '../../actions/auth'
import { NavBar } from '../../components'
import { hashHistory } from 'react-router'

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
      hashHistory.push('/')
      location.reload()
    }
  }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBarContainer