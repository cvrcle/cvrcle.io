import history from '../history'
import AuthService from '../utils/AuthService'
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

console.log(process.env.AUTH0_CLIENT_ID)
const authService = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN)

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin() {
  console.log('inside of checklogin')
  return (dispatch) => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', (authResult) => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { 
          return dispatch(loginError(error)) 
        }
        let userID = profile.identities[0].user_id
        let newUser = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          fbID: userID,
        }
        axios
          .get(process.env.API_URI + `/users?authID=${userID}`)
          .then((response) => {
            if (!response.data.length) {
              axios.post(process.env.API_URI + '/users', newUser)
                .then(() => {
                  console.log('new user has been added')
                })
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

export function loginRequest() {
  console.log('inside of login request')
  authService.login()
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(profile) {
  console.log('inside of login success ')
  history.replace('/home')
  return {
    type: LOGIN_SUCCESS,
    profile
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export function logoutSuccess() {
  console.log('inside of logout success')
  authService.logout()
  history.replace('/logout')
  return {
    type: LOGOUT_SUCCESS
  }
}
