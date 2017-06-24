import * as actions from '../actions/article'

const initialState = {
  article: null,
  publication: null,
  chapter: null,
  loading: false,
  error: null
}

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

const fetch = (state, action) => ({
  article: null,
  publication: action.publication,
  chapter: action.chapter,
  loading: true,
  error: null
})

const fetchFulfilled = (state, action) => ({
  ...state,
  article: action.article,
  loading: false,
  error: null
})

const fetchCancelled = (state) => ({
  ...state,
  loading: false,
  error: null
})

const fetchError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})
