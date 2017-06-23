import * as actions from '../actions/articleList'

const initialState = {
  publication: '',
  items: {},
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
  ...state,
  publication: action.publication,
  loading: true,
  error: null
})

const fetchFulfilled = (state, action) => ({
  ...state,
  items: { ...state.items, [action.publication]: action.items },
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
