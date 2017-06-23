import * as actions from '../actions/publicationList'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH:
      return fetch(state, action)
    case actions.FETCH_FULFILLED:
      return fetchFulfilled(state, action)
    case actions.FETCH_CANCELLED:
      return fetchCancelled(state, action)
    case actions.FETCH_ERROR:
      return fetchError(state, action)
    default:
      return state
  }
}

const fetch = () => ({
  topics: null,
  loading: true,
  error: null
})

const fetchFulfilled = (state, action) => ({
  topics: action.topics,
  loading: false,
  error: null
})

const fetchCancelled = (state) => ({
  ...state,
  loading: false,
  error: null
})

const fetchError = (state, action) => ({
  loading: false,
  error: action.error
})