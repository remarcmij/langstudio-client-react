import * as actions from '../actions/autoCompleteList'

export default (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_FULFILLED:
      return action.items
    default:
      return state
  }
}
