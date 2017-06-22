import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import ReduxPromise from 'redux-promise'
import './rx-add'
// import logger from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import speechService from './services/speechService'
import './index.css'

import {rootReducer, rootEpic } from './reducers'
import routes from './routes'

speechService.setup()

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore)
const epicMiddleware = createEpicMiddleware(rootEpic)
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, epicMiddleware)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <MuiThemeProvider>
      <Router>
        {routes}
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
