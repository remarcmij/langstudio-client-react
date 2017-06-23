import { combineReducers } from 'redux'

import publicationList from './publicationList'
import articleList from './articleList'
import article from './article'
import autoCompleteList from './autoCompleteList'

export const rootReducer = combineReducers({
  publicationList,
  articleList,
  article,
  autoCompleteList
})

