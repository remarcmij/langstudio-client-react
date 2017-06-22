import { Observable } from 'rxjs/Observable'

import config from '../config/config'
import { FETCH_AUTOCOMPLETE, FETCH_AUTOCOMPLETE_FULFILLED } from '../actions/index'

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_AUTOCOMPLETE_FULFILLED:
      return payload
    default:
      return state
  }
}

const fetchAutoCompleteFulfilled = payload => ({ type: FETCH_AUTOCOMPLETE_FULFILLED, payload })

export const fetchAutoCompleteEpic = action$ =>
  action$.ofType(FETCH_AUTOCOMPLETE)
    .debounceTime(250)
    .switchMap(action => Observable.ajax(`${config.apiEndPoint}/search/autocomplete?term=${action.payload}`))
    .map(res => fetchAutoCompleteFulfilled(res.response))
