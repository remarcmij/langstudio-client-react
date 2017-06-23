import { Observable } from 'rxjs/Observable'

import config from '../config/config'

const PREFIX = 'AUTOCOMPLETE_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'

export const fetch = term => ({ type: FETCH, payload: term })

export const fetchAutoCompleteEpic = action$ =>
  action$.ofType(FETCH)
    .debounceTime(250)
    .switchMap(action => {
      const url = `${config.apiEndPoint}/search/autocomplete?term=${action.payload}`
      return Observable.ajax(url)
        .map(res => ({ type: FETCH_FULFILLED, items: res.response }))
        .catch(err => Observable.of({ type: FETCH_ERROR, error: err }))
    })
