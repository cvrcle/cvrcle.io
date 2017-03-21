import { connect } from 'react-redux'
// import { loginRequest, logoutSuccess } from '../../actions/auth'
// import { Landing } from '../../components'
// import { hashHistory } from 'react-router'
// import { checkLogin } from '../../actions/auth'
import { ContributorEntry } from '../../components'

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth
  return {
    isAuthenticated,
    profile
  }
}

export const ContributorEntryContainer = connect(mapStateToProps)(ContributorEntry)
