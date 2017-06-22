import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import publicationsReducer, { fetchPublicationsEpic } from './publicationsReducer'
import articlesReducer, { fetchArticlesEpic} from './articlesReducer'
import articleContentReducer, {fetchArticleContentEpic} from './articleContentReducer'
import autoCompleteReducer, { fetchAutoCompleteEpic } from './autoCompleteReducer'


export const rootEpic = combineEpics(
  fetchPublicationsEpic,
  fetchArticlesEpic,
  fetchArticleContentEpic,
  fetchAutoCompleteEpic
)

export const rootReducer = combineReducers({
  publicationTopics: publicationsReducer,
  articleTopics: articlesReducer,
  articleContent: articleContentReducer,
  autoCompleteItems: autoCompleteReducer
})

