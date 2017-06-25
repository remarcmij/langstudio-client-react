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

const articleCleared = () => ({
  article: null,
  loading: false,
  error: null
})

const article = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH:
      return fetch(state, action)
    case actions.FETCH_FULFILLED:
      return fetchFulfilled(state, action)
    case actions.FETCH_CANCELLED:
      return fetchCancelled(state, action)
    case actions.FETCH_ERROR:
      return fetchError(state, action)
    case actions.CLEAR:
      return articleCleared(state, action)
    default:
      return state
  }
}

export default article
export const getArticle = (state) => state.article.article
export const getLoading = (state) => state.article.loading
export const getError = (state) => state.article.error
