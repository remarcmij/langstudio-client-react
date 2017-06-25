import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'

import { rootReducer } from './reducers'
import { rootEpic } from './actions'

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const createStoreWithMiddleware = applyMiddleware(epicMiddleware, logger)(createStore)
  return createStoreWithMiddleware(rootReducer)
}

export default configureStore
