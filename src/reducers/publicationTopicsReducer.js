import { FETCH_PUBLICATION_TOPICS } from '../actions/index'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_PUBLICATION_TOPICS:
      return { ...state, ...payload }
    default:
      return state
  }
}
