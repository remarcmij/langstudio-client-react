import { Observable } from 'rxjs/Observable'

import config from '../config/config'
import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_FULFILLED,
  FETCH_ARTICLES_CANCELLED
} from '../actions'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLES_FULFILLED:
      return payload
    case FETCH_ARTICLES_CANCELLED:
      return null
    default:
      return state
  }
}

export const fetchArticlesEpic = action$ =>
  action$.ofType(FETCH_ARTICLES)
    .switchMap(action => {
      const url = `${config.apiEndPoint}/topics/${action.payload.publication}?auth=${config.token}`
      return Observable.ajax(url)
        .map(res => ({ type: FETCH_ARTICLES_FULFILLED, payload: res.response }))
        .takeUntil(action$.ofType(FETCH_ARTICLES_CANCELLED))
    })
