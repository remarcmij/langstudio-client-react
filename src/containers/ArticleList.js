import { connect } from 'react-redux'

import ArticleList from '../components/ArticleList'
import * as actions from '../actions/articleList'
import * as selectors from '../selectors/articleList'

const mapStateToProps = (state) => ({
  topics: selectors.getTopics(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchArticleTopics(publication) {
    dispatch(actions.fetchArticleTopics(publication))
  },
  fetchArticleTopicsCancelled() {
    dispatch(actions.fetchArticleTopicsCancelled())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
