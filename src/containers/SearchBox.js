import { connect } from 'react-redux'

import SearchBox from '../components/SearchBox'
import * as actions from '../actions/autoCompleteList'
import { getItems, getLoading, getError } from '../selectors/autoCompleteList'

const mapStateToProps = (state) => ({
  items: getItems(state),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchAutoCompleteList(term) {
    dispatch(actions.fetchAutoCompleteList(term))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
