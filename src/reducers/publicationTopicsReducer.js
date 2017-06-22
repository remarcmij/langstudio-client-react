import { FETCH_PUBLICATION_TOPICS } from '../actions'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_PUBLICATION_TOPICS:
      return payload
    default:
      return state
  }
}
