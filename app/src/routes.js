import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, LandingPage, HomePage } from './containers'
import { AboutPage, NotFoundPage, Itinerary } from './components'

import AuthService from './utils/AuthService'

const requireAuth = (nextState, replace) => {
  if (!AuthService.loggedIn()) {
    alert('Please log in first!')
    replace({ pathname: '/' })
  }
}

export default function createRoutes() {
  return(
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage} />
      <Route path='/home' component={HomePage} onEnter={requireAuth}/>
      <Route path="/itinerary" component={Itinerary} onEnter={requireAuth} />
      <Route path='*' component={NotFoundPage} />
      <Route path='/logout' component={NotFoundPage} />
    </Route>
  )
}