import * as actions from '../actions/publications'

export default (state = null, action) => {
  switch (action.type) {
    case actions.FETCH_FULFILLED:
      return action.publications
    default:
      return state
  }
}
