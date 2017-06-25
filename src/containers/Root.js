import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Root({ store, routes }) {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router>
          {routes}
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
}
