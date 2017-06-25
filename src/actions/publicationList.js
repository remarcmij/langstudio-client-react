import { Observable } from 'rxjs/Observable'

import config from '../config/config'

const PREFIX = 'PUBLICATIONS_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_CANCELLED = PREFIX + 'FETCH_CANCELLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'

export const fetchPublicationTopics = () => ({ type: FETCH })
export const fetchPublicationTopicsCancelled = () => ({ type: FETCH_CANCELLED })

const fetchFulfilled = (topics) => ({ type: FETCH_FULFILLED, topics })
const fetchError = (error) => ({ type: FETCH_ERROR, error })

export const fetchPublicationTopicsEpic = action$ =>
  action$.ofType(FETCH)
    .switchMap(() => {
      const url = `${config.apiEndPoint}/topics`
      return Observable.ajax({
        url,
        headers: { Authorization: `Bearer ${config.token}` }
      }).map(res => fetchFulfilled(res.response))
        .catch(error => Observable.of(fetchError(error)))
        .takeUntil(action$.ofType(FETCH_CANCELLED))
    })

