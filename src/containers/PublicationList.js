import { connect } from 'react-redux'

import PublicationList from '../components/PublicationList'
import * as actions from '../actions/publicationList'
import * as selectors from '../selectors/publicationList'

const mapStateToProps = (state) => ({
  topics: selectors.getTopics(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchPublicationTopics() {
    dispatch(actions.fetchPublicationTopics())
  },
  fetchPublicationTopicsCancelled() {
    dispatch(actions.fetchPublicationTopicsCancelled())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicationList)
