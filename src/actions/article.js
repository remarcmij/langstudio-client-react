import { Observable } from 'rxjs/Observable'
import LRU from 'lru-cache'

import config from '../config/config'

const PREFIX = 'ARTICLE_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_CANCELLED = PREFIX + 'FETCH_CANCELLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'
export const CLEAR = PREFIX + 'CLEAR'

const cache = LRU({ max: 25, maxAge: 1000 * 60 * 60 })

export const fetchArticle = (publication, chapter) => ({ type: FETCH, payload: { publication, chapter } })
export const fetchArticleCancelled = () => ({ type: FETCH_CANCELLED })
export const clearArticle = () => ({ type: CLEAR })

const fetchFulfilled = (article) => ({
  type: FETCH_FULFILLED,
  payload: { article }
})

const fetchError = (error) => ({
  type: FETCH_ERROR,
  payload: { error }
})

export const fetchArticleEpic = action$ =>
  action$.ofType(FETCH)
    .switchMap(({ payload }) => {
      const { publication, chapter } = payload
      const fileName = `${publication}.${chapter}.md`
      const actionOut = cache.get(fileName)
      if (actionOut) {
        return Observable.of(actionOut)
      }
      const url = `${config.apiEndPoint}/article/${fileName}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchFulfilled(res.response))
        .do(actionOut => cache.set(fileName, actionOut))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(FETCH_CANCELLED))
    })
