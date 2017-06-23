import { combineEpics } from 'redux-observable'
import { fetchPublicationsEpic } from './publications'
import { fetchArticlesEpic } from './articles'
import { fetchArticleEpic } from './article'
import { fetchAutoCompleteEpic } from './autoComplete'

export const rootEpic = combineEpics(
  fetchPublicationsEpic,
  fetchArticlesEpic,
  fetchArticleEpic,
  fetchAutoCompleteEpic
)
