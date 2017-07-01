import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import NavBar from './containers/App.jsx'
import HomePage from './containers/HomePage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import LandingPage from './components/LandingPage.jsx'
import Itinerary from './components/Itinerary.jsx'

import AuthService from './utils/AuthService'
import configureStore from './store/configureStore'
import createRoutes from './routes'

import history from './history'

const requireAuth = (nextState, replace) => {
  if (!AuthService.loggedIn()) {
    alert('Please log in first!')
    replace({ pathname: '/' })
  }
}

const store = configureStore()

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history} >
        <div>
          <div>
            <NavBar />
          </div>
          <Switch>
            <Route exactly pattern="/" component={LandingPage} />
            <Route pattern="/home" component={HomePage} />
            <Route pattern="/itinerary" component={Itinerary} />
            <Route pattern="/*" component={NotFoundPage} />
            <Route pattern="/logout" component={LandingPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

