import { Observable } from 'rxjs/Observable'

import config from '../config/config'

const PREFIX = 'PUBLICATIONS_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_CANCELLED = PREFIX + 'FETCH_CANCELLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'

export const fetch = () => ({ type: FETCH })
export const fetchCancelled = () => ({ type: FETCH_CANCELLED })

export const fetchPublicationsEpic = action$ =>
  action$.ofType(FETCH)
    .switchMap(() => {
      const url = `${config.apiEndPoint}/topics?auth=${config.token}`
      return Observable.ajax(url)
        .map(res => ({ type: FETCH_FULFILLED, publications: res.response }))
        .catch(err => Observable.of({ type: FETCH_ERROR, error: err }))
        .takeUntil(action$.ofType(FETCH_CANCELLED))
    })
