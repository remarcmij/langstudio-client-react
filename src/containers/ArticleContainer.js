import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ArticlePage from '../components/ArticlePage'
import * as actions from '../actions/article'
import * as selectors from '../selectors/article'
import speechService from '../services/speechService'

class ArticleContainer extends Component {

  static propTypes = {
    article: PropTypes.object,
    publication: PropTypes.string,
    chapter: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchArticle: PropTypes.func.isRequired,
    fetchArticleCancelled: PropTypes.func.isRequired,
    clearArticle: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  static defaultProps = {
    article: null,
    publication: null,
    chapter: null,
    loading: false,
    error: null
  }

  constructor(props) {
    super(props)
    this.onTextClick = this.onTextClick.bind(this)
    this.onRetryClick = this.onRetryClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onBackClick = this.onBackClick.bind(this)
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

  onRetryClick() {
    const { publication, chapter, fetchArticle } = this.props
    fetchArticle(publication, chapter)
  }

  onTextClick(ev) {
    if (speechService.isSpeechSynthesisSupported) {
      if (ev.target.tagName === 'SPAN') {
        ev.preventDefault()
        ev.stopPropagation()
        const text = ev.target.innerText.trim()
        const { targetLang } = this.props.article._topic
        speechService.speak(text, targetLang)
      }
    }
  }

  onBackClick = () => {
    this.props.history.push(`/content/${this.props.match.params.publication}`)
  }

  onSearchClick = () => {
    this.props.history.push(`/search`)
  }

  render() {
    const { article, error } = this.props
    return (
      <ArticlePage
        article={article}
        error={error}
        onTextClick={this.onTextClick}
        onRetryClick={this.onRetryClick}
        onSearchClick={this.onSearchClick}
        onBackClick={this.onBackClick}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  article: selectors.getArticle(state),
  publication: selectors.getPublication(state),
  chapter: selectors.getChapter(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

export default connect(mapStateToProps, {
  fetchArticle: actions.fetchArticle,
  fetchArticleCancelled: actions.fetchArticleCancelled,
  clearArticle: actions.clearArticle
})(ArticleContainer)
