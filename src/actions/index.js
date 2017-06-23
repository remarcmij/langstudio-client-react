import { combineEpics } from 'redux-observable'
import { fetchPublicationListEpic } from './publicationList'
import { fetchArticleListEpic } from './articleList'
import { fetchArticleEpic } from './article'
import { fetchAutoCompleteListEpic } from './autoCompleteList'

export const rootEpic = combineEpics(
  fetchPublicationListEpic,
  fetchArticleListEpic,
  fetchArticleEpic,
  fetchAutoCompleteListEpic
)
