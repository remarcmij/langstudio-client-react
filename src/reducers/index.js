import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import PublicationTopicsReducer from './publicationTopicsReducer'
import ArticleTopicsReducer from './articleTopicsReducer'
import ArticleContentReducer from './articleContentReducer'
import autoCompleteReducer, { fetchAutoCompleteEpic } from './autoCompleteReducer'


export const rootEpic = combineEpics(fetchAutoCompleteEpic)

export const rootReducer = combineReducers({
  publicationTopics: PublicationTopicsReducer,
  articleTopics: ArticleTopicsReducer,
  articleContent: ArticleContentReducer,
  autoCompleteItems: autoCompleteReducer
})

