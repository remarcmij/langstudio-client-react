import * as actions from '../actions/publicationList'

const initialState = {
  topics: null,
  loading: false,
  error: null
}

const fetch = () => ({
  topics: null,
  loading: true,
  error: null
})

const fetchFulfilled = (state, payload) => ({
  ...payload,
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
  loading: false,
})

export default function reducer(state = initialState, { type, payload }) {
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

export const getTopics = (state) => state.publicationList.topics
export const getLoading = (state) => state.publicationList.loading
export const getError = (state) => state.publicationList.error
