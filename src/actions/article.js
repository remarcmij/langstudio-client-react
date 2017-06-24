import { Observable } from 'rxjs/Observable'
import LRU from 'lru-cache'

import config from '../config/config'

const PREFIX = 'ARTICLE_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_CANCELLED = PREFIX + 'FETCH_CANCELLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'
export const CLEARED = PREFIX + 'CLEARED'

const cache = LRU({ max: 25, maxAge: 1000 * 60 * 60 })

export const fetch = (publication, chapter) => ({ type: FETCH, publication, chapter })
export const fetchCancelled = () => ({ type: FETCH_CANCELLED })
export const articleCleared = () => ({ type: CLEARED })

export const fetchArticleEpic = action$ =>
  action$.ofType(FETCH)
    .switchMap(action => {
      const { publication, chapter } = action
      const fileName = `${publication}.${chapter}.md`
      const actionOut = cache.get(fileName)
      if (actionOut) {
        return Observable.of(actionOut)
      }
      const url = `${config.apiEndPoint}/article/${fileName}/?auth=${config.token}`
      return Observable.ajax(url)
        .map(res => fetchFulfilled(res.response))
        .do(actionOut => cache.set(fileName, actionOut))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(FETCH_CANCELLED))
    })

const fetchFulfilled = (article) => ({
  type: FETCH_FULFILLED,
  article
})

const fetchError = (error) => ({
  type: FETCH_ERROR,
  error
})
