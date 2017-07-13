import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { rootReducer } from './reducers'
import { rootEpic } from './actions'

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(epicMiddleware)
  ))
}

export default configureStore
