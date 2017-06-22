import { FETCH_ARTICLE_TOPICS } from '../actions'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE_TOPICS:
      return payload
    default:
      return state
  }
}
