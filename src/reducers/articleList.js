import * as actions from '../actions/articleList'

const initialState = {
  topics: {},
  loading: false,
  error: null
}


const fetch = (state) => ({
  ...state,
  loading: true,
  error: null
})

const fetchFulfilled = (state, payload) => ({
  topics: { ...state.topics, [payload.publication]: payload.topics },
  loading: false,
  error: null
})

const fetchCancelled = (state) => ({
  ...state,
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
    case actions.FETCH_CANCELLED:
      return fetchCancelled(state, payload)
    case actions.FETCH_ERROR:
      return fetchError(state, payload)
    default:
      return state
  }
}

export const getTopics = (state, publication) => state.articleList.topics[publication]
export const getLoading = (state) => state.articleList.loading
export const getError = (state) => state.articleList.error
