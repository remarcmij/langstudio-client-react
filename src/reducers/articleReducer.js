import * as actions from '../actions/article'

export default (state = null, action) => {
  switch (action.type) {
    case actions.FETCH_FULFILLED:
      return action.article
    case actions.FETCH_CANCELLED:
      return null
    case actions.FETCH_ERROR:
      console.log('error', action.error)
      return null
    default:
      return state
  }
}
