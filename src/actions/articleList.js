import { Observable } from 'rxjs/Observable'

import config from '../config/config'

const PREFIX = 'ARTICLES_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_CANCELLED = PREFIX + 'FETCH_CANCELLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'

export const fetch = (publication) => ({ type: FETCH, publication })
export const fetchCancelled = () => ({ type: FETCH_CANCELLED })

export const fetchArticleListEpic = action$ =>
  action$.ofType(FETCH)
    .switchMap(action => {
      const { publication } = action
      const url = `${config.apiEndPoint}/topics/${publication}?auth=${config.token}`
      return Observable.ajax(url)
        .map(res => fetchFulfilled(publication, res.response))
        .catch(error => Observable.of(fetchError(publication, error)))
        .takeUntil(action$.ofType(FETCH_CANCELLED))
    })

const fetchFulfilled = (publication, topics) => ({
  type: FETCH_FULFILLED,
  publication,
  topics
})

const fetchError = (publication, error) => ({
  type: FETCH_ERROR,
  publication,
  error
})
