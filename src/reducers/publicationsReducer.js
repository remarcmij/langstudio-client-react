import { Observable } from 'rxjs/Observable'

import config from '../config/config'
import {
  FETCH_PUBLICATIONS,
  FETCH_PUBLICATIONS_FULFILLED,
  FETCH_PUBLICATIONS_CANCELLED
} from '../actions'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_PUBLICATIONS_FULFILLED:
      return payload
    default:
      return state
  }
}

export const fetchPublicationsEpic = action$ =>
  action$.ofType(FETCH_PUBLICATIONS)
    .switchMap(() => {
      const url = `${config.apiEndPoint}/topics?auth=${config.token}`
      return Observable.ajax(url)
        .map(res => ({ type: FETCH_PUBLICATIONS_FULFILLED, payload: res.response }))
        .takeUntil(action$.ofType(FETCH_PUBLICATIONS_CANCELLED))
    })
