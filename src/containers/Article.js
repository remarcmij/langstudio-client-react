import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

import ArticleContent from '../components/ArticleContent'
import NetworkError from '../components/NetworkError'
import * as actions from '../actions/article'
import * as selectors from '../selectors/article'

class Article extends Component {

  static propTypes = {
    article: PropTypes.object,
    publication: PropTypes.string,
    chapter: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchArticle: PropTypes.func,
    fetchArticleCancelled: PropTypes.func,
    clearArticle: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount() {
    const { publication, chapter } = this.props.match.params
    this.props.fetchArticle(publication, chapter)
  }

  componentWillUnmount() {
    const { loading, fetchArticleCancelled, clearArticle } = this.props
    if (loading) {
      fetchArticleCancelled()
    } else {
      clearArticle()
    }
  }

  renderArticleContent() {
    const { error, article, publication, chapter, fetchArticle } = this.props
    if (error) {
      return (
        <NetworkError error={error} retry={() => fetchArticle(publication, chapter)} />
      )
    }
    if (!article) {
      return null
    }
    return (
      <ArticleContent article={article} />
    )
  }

  render() {
    return (
      <div>
        <AppBar
          className="AppBar"
          title={<span>Article</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.onBackButtonTouchTap}>
              <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>
          }
          iconElementRight={
            <IconButton onTouchTap={this.onSearchButtonTouchTap}>
              <FontIcon className="material-icons">search</FontIcon>
            </IconButton>
          }

        />
        {this.renderArticleContent()}
      </div>
    )
  }

  onBackButtonTouchTap = () => {
    this.props.history.push(`/content/${this.props.match.params.publication}`)
  }

  onSearchButtonTouchTap = () => {
    this.props.history.push(`/search`)
  }

}

function mapStateToProps(state) {
  return {
    article: selectors.getArticle(state),
    publication: selectors.getPublication(state),
    chapter: selectors.getChapter(state),
    loading: selectors.getLoading(state),
    error: selectors.getError(state)
  }
}

export default connect(mapStateToProps, {
  fetchArticle: actions.fetchArticle,
  fetchArticleCancelled: actions.fetchArticleCancelled,
  clearArticle: actions.clearArticle
})(Article)
