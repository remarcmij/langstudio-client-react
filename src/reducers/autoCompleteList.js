import * as actions from '../actions/autoCompleteList'

const intialState = {
  term: '',
  items: null,
  loading: false,
  error: null
}

export default (state = intialState, action) => {
  switch (action.type) {
    case actions.FETCH:
      return fetch(state, action)
    case actions.FETCH_FULFILLED:
      return fetchFulfilled(state, action)
    case actions.FETCH_ERROR:
      return fetchError(state, action)
    default:
      return state
  }
}

const fetch = (state, action) => ({
  term: action.term,
  items: null,
  loading: true,
  error: null
})

const fetchFulfilled = (state, action) => ({
  ...state,
  items: action.items,
  loading: false,
  error: null
})

const fetchError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})
