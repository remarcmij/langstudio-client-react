import { combineEpics } from 'redux-observable'
import { fetchPublicationTopicsEpic } from './publicationList'
import { fetchArticleTopicsEpic } from './articleList'
import { fetchArticleEpic } from './article'
import { fetchAutoCompleteListEpic } from './autoCompleteList'

export const rootEpic = combineEpics(
  fetchPublicationTopicsEpic,
  fetchArticleTopicsEpic,
  fetchArticleEpic,
  fetchAutoCompleteListEpic
)
