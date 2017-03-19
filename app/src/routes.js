import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { AppContainer, LandingContainer } from './containers'
import { HomePage, AboutPage, NotFoundPage, Landing, App } from './components'

export default function createRoutes() {
  return(
    <Route path='/' component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path='/#/home' component={HomePage}/>
      <Route path='*' component={NotFoundPage} />
      <Route path='/#/logout' component={NotFoundPage} />
    </Route>
  )
}
