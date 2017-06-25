import { connect } from 'react-redux'

import Article from '../components/Article'
import * as actions from '../actions/article'
import * as selectors from '../selectors/article'

const mapStateToProps = (state) => ({
  article: selectors.getArticle(state),
  publication: selectors.getPublication(state),
  chapter: selectors.getChapter(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchArticle(publication, chapter) {
    dispatch(actions.fetchArticle(publication, chapter))
  },
  fetchArticleCancelled() {
    dispatch(actions.fetchArticleCancelled())
  },
  clearArticle() {
    dispatch(actions.clearArticle())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
