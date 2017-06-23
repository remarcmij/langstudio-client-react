import * as actions from '../actions/articles'

export default (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_FULFILLED:
      return { ...state, ...action.articles }
    default:
      return state
  }
}
