import * as actions from '../actions/autoCompleteList'

const initialState = {
  items: null,
  loading: false,
  error: null
}

const fetch = () => ({
  items: null,
  loading: true,
  error: null
})

const fetchFulfilled = (state, payload) => ({
  ...payload,
  loading: false,
  error: null
})

const fetchError = (state, payload) => ({
  ...payload,
  loading: false
})

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case actions.FETCH:
      return fetch(state, payload)
    case actions.FETCH_FULFILLED:
      return fetchFulfilled(state, payload)
    case actions.FETCH_ERROR:
      return fetchError(state, payload)
    default:
      return state
  }
}

export const getItems = (state) => state.autoCompleteList.items
export const getLoading = (state) => state.autoCompleteList.loading
export const getError = (state) => state.autoCompleteList.error
