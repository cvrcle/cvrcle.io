import React from 'react'
// import { Route, IndexRoute } from 'react-router'
import { BrowserRouter, Match, Link } from 'react-router'
import App from './containers/App.jsx'
import HomePage from './containers/HomePage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import LandingPage from './components/LandingPage.jsx'
import Itinerary from './components/Itinerary.jsx'
import AuthService from './utils/AuthService'

const requireAuth = (nextState, replace) => {
  if (!AuthService.loggedIn()) {
    alert('Please log in first!')
    replace({ pathname: '/' })
  }
}

// export default function createRoutes() {
//   return(
//     <Route path='/' component={App}>
//       <IndexRoute component={LandingPage} />
//       <Route path='/home' component={HomePage} onEnter={requireAuth}/>
//       <Route path="/itinerary" component={Itinerary} onEnter={requireAuth} />
//       <Route path='*' component={NotFoundPage} />
//       <Route path='/logout' component={NotFoundPage} />
//     </Route>
//   )
// }

export default function createRoutes() {
  <BrowserRouter>
    <Provider store={store}>
      <div className="app-header">
        <App />
      </div>
      <Match exactly pattern="/" component={LandingPage} />
      <Match pattern="/home" component={HomePage} onEnter={requireAuth} />
      <Match pattern="/itinerary" component={Itinerary} onEnter={requireAuth} />
      <Match pattern="/*" component={NotFoundPage} />
      <Match pattern="/logout" component={LandingPage} />
    </Provider>
  </BrowserRouter>
}
