import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ArticleList from '../components/ArticleList'
import * as actions from '../actions/articleList'
import { getTopics, getLoading, getError } from '../reducers/articleList'

class ArticleListWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.handleFetchArticleTopics = this.handleFetchArticleTopics.bind(this)
  }

  componentDidMount() {
    const { topics } = this.props
    if (!topics) {
      this.handleFetchArticleTopics()
    }
  }

  componentWillUnmount() {
    const { loading, fetchArticleTopicsCancelled } = this.props
    if (loading) {
      fetchArticleTopicsCancelled()
    }
  }

  onBackClick() {
    this.props.history.push('/')
  }

  onSearchClick() {
    this.props.history.push('/search')
  }

  onItemClick(topic) {
    this.props.history.push(`/content/${topic.publication}/${topic.chapter}`)
  }

  handleFetchArticleTopics() {
    const { match, fetchArticleTopics } = this.props
    const { publication } = match.params
    fetchArticleTopics(publication)
  }

  render() {
    const { publication } = this.props.match.params
    return (
      <ArticleList
        publication={publication}
        onBackClick={this.onBackClick}
        onSearchClick={this.onSearchClick}
        onItemClick={this.onItemClick}
        onRetryClick={this.handleFetchArticleTopics}
        {...this.props}
      />
    )
  }
}

ArticleListWrapper.propTypes = {
  topics: PropTypes.array,
  loading: PropTypes.bool,
  fetchArticleTopics: PropTypes.func.isRequired,
  fetchArticleTopicsCancelled: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

ArticleListWrapper.defaultProps = {
  topics: null,
  loading: false
}

const mapStateToProps = (state, { match }) => ({
  topics: getTopics(state, match.params.publication),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchArticleTopics(publication) {
    dispatch(actions.fetchArticleTopics(publication))
  },
  fetchArticleTopicsCancelled() {
    dispatch(actions.fetchArticleTopicsCancelled())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListWrapper)
