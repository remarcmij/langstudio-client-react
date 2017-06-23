import { combineReducers } from 'redux'

import publications from './publicationsReducer'
import articles from './articlesReducer'
import article from './articleReducer'
import autoCompleteItems from './autoCompleteReducer'

export const rootReducer = combineReducers({
  publications,
  articles,
  article,
  autoCompleteItems
})

