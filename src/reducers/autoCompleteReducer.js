import { FETCH_AUTOCOMPLETE_ITEMS } from '../actions/index'

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_AUTOCOMPLETE_ITEMS:
      return payload
    default:
      return state
  }
}
