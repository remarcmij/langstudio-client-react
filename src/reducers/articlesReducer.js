import { Observable } from 'rxjs/Observable'

import config from '../config/config'
import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_FULFILLED,
  FETCH_ARTICLES_CANCELLED
} from '../actions'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLES_FULFILLED:
      return { ...state, ...payload }
    default:
      return state
  }
}

export const fetchArticlesEpic = action$ =>
  action$.ofType(FETCH_ARTICLES)
    .switchMap(action => {
      const { publication } = action.payload
      const url = `${config.apiEndPoint}/topics/${publication}?auth=${config.token}`
      return Observable.ajax(url)
        .map(res => ({ type: FETCH_ARTICLES_FULFILLED, payload: { [publication]: res.response } }))
        .takeUntil(action$.ofType(FETCH_ARTICLES_CANCELLED))
    })
