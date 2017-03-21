import { connect } from 'react-redux'
import { checkLogin } from '../../actions/auth'
import { App } from '../../components'

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

export const AppContainer = connect(null, mapDispatchToProps)(App)

