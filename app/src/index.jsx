import React, { Component } from 'react'
import { render } from 'react-dom'
// import { Switch } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './containers/App.jsx'
import NavBar from './containers/NavBar.jsx'
import HomePage from './containers/HomePage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import LandingPage from './components/LandingPage.jsx'
import Itinerary from './components/Itinerary.jsx'
import AuthService from './utils/AuthService'

import configureStore from './store/configureStore'
import createRoutes from './routes'

const requireAuth = (nextState, replace) => {
  if (!AuthService.loggedIn()) {
    alert('Please log in first!')
    replace({ pathname: '/' })
  }
}

const store = configureStore()

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div>
            <App />
            <Switch>

            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}

render(
  <Routes />,
  document.getElementById('appRoot')
)
      // <Provider store={store}>
      // </Provider>


          // <div>
          //   <Route exactly pattern="/" component={LandingPage} />
          //   <Route pattern="/home" component={HomePage} />
          //   <Route pattern="/itinerary" component={Itinerary} />
          //   <Route pattern="/*" component={NotFoundPage} />
          //   <Route pattern="/logout" component={LandingPage} />
          // </div>