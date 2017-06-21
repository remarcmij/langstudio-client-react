import { FETCH_ARTICLE_CONTENT } from '../actions/index'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE_CONTENT:
      return payload
    default:
      return state
  }
}
