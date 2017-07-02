import history from '../history'
import AuthService from '../utils/AuthService'
import axios from 'axios';
import * as authActions from './constants'

const authService = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN)

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin() {
  return (dispatch) => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', (authResult) => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          return dispatch(loginError(error))
        }
        let userID = profile.identities[0].user_id
        axios
          .get(process.env.API_URI + `/users?fbID=${userID}`)
          .then((response) => {
            if (!response.data.length) {
              addUser(profile, userID)
            }
            AuthService.setProfile(profile) // static method
            AuthService.setToken(authResult.idToken) // static method
            dispatch(loginSuccess(profile))
            history.replace('/home')
          })
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', (error) => dispatch(loginError(error)))
  }
}

const addUser = (profile, userID) => {
  let newUser = {
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    fbID: userID,
  }
  axios.post(process.env.API_URI + '/users', newUser)
    .then(() => {
      console.log('new user has been added')
    })
    .catch((err) => {
      console.log('error adding a new user', err)
    })
}

export function loginRequest() {
  authService.login()
  return {
    type: authActions.LOGIN_REQUEST
  }
}

export function loginSuccess(profile) {
  history.push('/home')
  return {
    type: authActions.LOGIN_SUCCESS,
    profile
  }
}

export function loginError(error) {
  return {
    type: authActions.LOGIN_ERROR,
    error
  }
}

export function logoutSuccess() {
  authService.logout()
  history.push('/')
  return {
    type: authActions.LOGOUT_SUCCESS
  }
}
