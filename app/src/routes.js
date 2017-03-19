import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { AppContainer, LandingContainer } from './containers'
import { HomePage, AboutPage, NotFoundPage, Landing } from './components'

export default function createRoutes() {
  return(
    <Route path='/' component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path='/#/itineraries' component={AppContainer}/>
      <Route path='*' component={NotFoundPage} />
      <Route path='/#/logout' component={LandingContainer} />
    </Route>
  )
}
