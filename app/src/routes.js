import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
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

function PrivateRoute({component: Component, authed, ...rest}) {
  return(
    <Route 
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />
      }
    />
  )
}

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
            <PrivateRoute authed={AuthService.loggedIn()} path="/home" component={HomePage} />
            <PrivateRoute authed={AuthService.loggedIn()} path="/itinerary" component={Itinerary} />
            <PrivateRoute authed={AuthService.loggedIn()} path="/*" component={NotFoundPage} />
            <PrivateRoute authed={AuthService.loggedIn()} path="/logout" component={LandingPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

