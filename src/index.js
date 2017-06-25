import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './rx-addons'

import configureStore from './configureStore'
import routes from './routes'
import Root from './containers/Root'
import speechService from './services/speechService'
import './index.css'

speechService.setup()

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const store = configureStore()

ReactDOM.render(
  <Root store={store} routes={routes} />,
  document.getElementById('root')
)
