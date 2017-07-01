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
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/itinerary" component={Itinerary} />
            <Route path="/*" component={NotFoundPage} />
            <Route path="/logout" component={LandingPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

