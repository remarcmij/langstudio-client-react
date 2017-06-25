import { connect } from 'react-redux'

import SearchBox from '../components/SearchBox'
import * as actions from '../actions/autoCompleteList'
import * as selectors from '../selectors/autoCompleteList'

const mapStateToProps = (state) => ({
  items: selectors.getItems(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchAutoCompleteList(term) {
    dispatch(actions.fetchAutoCompleteList(term))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
