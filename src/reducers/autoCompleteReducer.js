import { Observable } from 'rxjs/Observable'

import config from '../config/config'
import { FETCH_AUTOCOMPLETE, FETCH_AUTOCOMPLETE_FULFILLED } from '../actions'

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_AUTOCOMPLETE_FULFILLED:
      return payload
    default:
      return state
  }
}

export const fetchAutoCompleteEpic = action$ =>
  action$.ofType(FETCH_AUTOCOMPLETE)
    .debounceTime(250)
    .switchMap(action => {
      const url = `${config.apiEndPoint}/search/autocomplete?term=${action.payload}`
      return Observable.ajax(url)
        .map(res => ({ type: FETCH_AUTOCOMPLETE_FULFILLED, payload: res.response }))
    })
