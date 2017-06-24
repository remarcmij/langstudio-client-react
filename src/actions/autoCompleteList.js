import { Observable } from 'rxjs/Observable'
import LRU from 'lru-cache'

import config from '../config/config'

const PREFIX = 'AUTOCOMPLETE_'
export const FETCH = PREFIX + 'FETCH'
export const FETCH_FULFILLED = PREFIX + 'FETCH_FULFILLED'
export const FETCH_ERROR = PREFIX + 'FETCH_ERROR'

export const fetchAutoCompleteList = term => ({ type: FETCH, term })

const cache = LRU({ max: 100, maxAge: 1000 * 60 * 60 })

const fetchFulfilled = (items) => ({ type: FETCH_FULFILLED, items })
const fetchError = (error) => ({ type: FETCH_ERROR, error })

export const fetchAutoCompleteListEpic = action$ =>
  action$.ofType(FETCH)
    .debounceTime(250)
    .switchMap(action => {
      const { term } = action
      const items = cache.get(term)
      if (items) {
        return Observable.of(items)
      }
      const url = `${config.apiEndPoint}/search/autocomplete?term=${action.term}`
      return Observable.ajax(url)
        .map(res => fetchFulfilled(res.response))
        .do(items => cache.set(term, items))
        .catch(error => Observable.of(fetchError(error)))
    })

