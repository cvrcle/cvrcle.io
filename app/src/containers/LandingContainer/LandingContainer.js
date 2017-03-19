import { connect } from 'react-redux'
import { loginRequest, logoutSuccess } from '../../actions/auth'
import { Landing } from '../../components'
import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

const LandingContainer = connect(
  null, // no mapStateToProps
mapDispatchToProps)(Landing)

export default LandingContainer

//for regina