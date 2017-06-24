import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ArticleListPage from '../components/ArticleListPage'
import * as actions from '../actions/articleList'
import * as selectors from '../selectors/articleList'

class ArticleListContainer extends Component {

  static propTypes = {
    articles: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
    fetchArticleList: PropTypes.func,
    fetchArticleListCancelled: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.onRetryClick = this.onRetryClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
  }

  get articles() {
    const { articles } = this.props
    const { publication } = this.props.match.params
    return articles[publication]
  }

  componentDidMount() {
    if (!this.articles) {
      const { publication } = this.props.match.params
      this.props.fetchArticleList(publication)
    }
  }

  componentWillUnmount() {
    const { loading, fetchArticleListCancelled } = this.props
    if (loading) {
      fetchArticleListCancelled()
    }
  }

  render() {
    return (
      <ArticleListPage
        articles={this.articles}
        error={this.props.error}
        onRetryClick={this.onRetryClick}
        onItemClick={this.onItemClick}
        onSearchClick={this.onSearchClick}
        onBackClick={this.onBackClick}
      />
    )
  }

  onRetryClick() {
    const { publication } = this.props.match.params
    this.props.fetchArticleList(publication)
  }

  onBackClick() {
    this.props.history.push('/')
  }

  onSearchClick() {
    this.props.history.push(`/search`)
  }

  onItemClick(topic) {
    this.props.history.push(`/content/${topic.publication}/${topic.chapter}`)
  }

}

const mapStateToProps = (state) => ({
  articles: selectors.getArticles(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

export default connect(mapStateToProps, {
  fetchArticleList: actions.fetchArticleList,
  fetchArticleListCancelled: actions.fetchArticleListCancelled
})(ArticleListContainer)