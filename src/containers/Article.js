import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Article from '../components/Article'
import * as actions from '../actions/article'
import { getArticle, getLoading, getError } from '../reducers/article'
import speechService from '../services/speechService'

class ArticleWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.handleFetchArticle = this.handleFetchArticle.bind(this)
    this.handleSpeech = this.handleSpeech.bind(this)
  }

  componentDidMount() {
    this.handleFetchArticle()
  }

  componentWillUnmount() {
    const { loading, fetchArticleCancelled, clearArticle } = this.props
    if (loading) {
      fetchArticleCancelled()
    } else {
      clearArticle()
    }
  }

  handleFetchArticle() {
    const { match, fetchArticle } = this.props
    const { publication, chapter } = match.params
    fetchArticle(publication, chapter)
  }

  onBackClick() {
    const { history, match } = this.props
    const { publication } = match.params
    history.push(`/content/${publication}`)
  }

  onSearchClick() {
    this.props.history.push('/search')
  }

  handleSpeech(text, lang) {
    if (speechService.isSpeechSynthesisSupported) {
      speechService.speak(text, lang)
    }
  }

  render() {
    return (
      <Article
        onBackClick={this.onBackClick}
        onSearchClick={this.onSearchClick}
        onRetryClick={this.handleFetchArticle}
        handleSpeech={this.handleSpeech}
        {...this.props}
      />
    )
  }
}

ArticleWrapper.propTypes = {
  loading: PropTypes.bool,
  fetchArticle: PropTypes.func.isRequired,
  fetchArticleCancelled: PropTypes.func.isRequired,
  clearArticle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

ArticleWrapper.defaultProps = {
  loading: false
}

const mapStateToProps = (state) => ({
  article: getArticle(state),
  loading: getLoading(state),
  error: getError(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleWrapper)
