import { hashHistory } from 'react-router'
import AuthService from '../utils/AuthService'
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'


const authService = new AuthService('qpfelAKW1EAzyb3RI3pk46SD0deXrJhE', 'cvrcle.auth0.com')

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin() {
  return (dispatch) => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', (authResult) => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { return dispatch(loginError(error)) }
        let userID = profile.identities[0].user_id
        let newUser = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          fbID: userID,
        }
        axios
          .get(`http://localhost:3000/users?authID=${userID}`)
          .then((response) => {
            if (!response.data.length) {
              axios.post('http://localhost:3000/users', newUser)
                .then(() => {
                  console.log('new user has been added')
                })
            }
            AuthService.setProfile(profile) // static method
            AuthService.setToken(authResult.idToken) // static method
            dispatch(loginSuccess(profile))
            hashHistory.push('/home')
          })
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', (error) => dispatch(loginError(error)))
  }
}

export function loginRequest() {
  authService.login()
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(profile) {
  hashHistory.push('/home')
  location.reload()
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
  authService.logout()
  return {
    type: LOGOUT_SUCCESS
  }
}
