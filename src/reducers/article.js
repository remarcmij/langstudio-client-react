import * as actions from '../actions/article'

const initialState = {
  article: null,
  loading: false,
  error: null
}

const fetch = () => ({
  article: null,
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
  loading: false
})

const articleCleared = () => ({
  article: null,
  loading: false,
  error: null
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
    case actions.CLEAR:
      return articleCleared(state, payload)
    default:
      return state
  }
}

export const getArticle = (state) => state.article.article
export const getLoading = (state) => state.article.loading
export const getError = (state) => state.article.error
