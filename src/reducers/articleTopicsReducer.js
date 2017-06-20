import { FETCH_ARTICLE_TOPICS } from '../actions/index'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE_TOPICS:
      return { ...state, ...payload }
    default:
      return state
  }
}
