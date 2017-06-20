import { FETCH_ARTICLE_CONTENT } from '../actions/index'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE_CONTENT:
      return { ...state, ...payload }
    default:
      return state
  }
}
