import { Observable } from 'rxjs/Observable'

import config from '../config/config'

const PREFIX = 'ARTICLES_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_CANCELLED = PREFIX + 'FETCH_CANCELLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'

export const fetchArticleTopics = (publication) => ({ type: FETCH, payload: { publication } })
export const fetchArticleTopicsCancelled = () => ({ type: FETCH_CANCELLED })

const fetchFulfilled = (publication, topics) => ({
  type: FETCH_FULFILLED,
  payload: { publication, topics }
})

const fetchError = (publication, error) => ({
  type: FETCH_ERROR,
  payload: { publication, error }
})

export const fetchArticleTopicsEpic = action$ =>
  action$.ofType(FETCH)
    .switchMap(({ payload }) => {
      const publication = payload.publication
      const url = `${config.apiEndPoint}/topics/publication/${publication}`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchFulfilled(publication, res.response))
        .catch(error => Observable.of(fetchError(publication, error)))
        .takeUntil(action$.ofType(FETCH_CANCELLED))
    })

