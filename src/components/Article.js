import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import ChildAppBar from './ChildAppBar'
import NetworkError from './NetworkError'
import speechService from '../services/speechService'
import './Article.css'

export default class Article extends React.Component {

  static propTypes = {
    article: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
    fetchArticle: PropTypes.func.isRequired,
    fetchArticleCancelled: PropTypes.func.isRequired,
    clearArticle: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static defaultProps = {
    article: null,
    loading: false,
    error: null
  }

  constructor(props) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onTextClick = this.onTextClick.bind(this)
    this.fetchArticle = this.fetchArticle.bind(this)
  }

  componentDidMount() {
    this.fetchArticle()
  }

  componentWillUnmount() {
    const { loading, fetchArticleCancelled, clearArticle } = this.props
    if (loading) {
      fetchArticleCancelled()
    } else {
      clearArticle()
    }
  }

  onBackClick = () => {
    this.props.history.push(`/content/${this.props.match.params.publication}`)
  }

  onSearchClick = () => {
    this.props.history.push(`/search`)
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

  fetchArticle() {
    const { publication, chapter } = this.props.match.params
    this.props.fetchArticle(publication, chapter)
  }

  getDir(article) {
    const { baseLang, targetLang } = article._topic
    return baseLang.startsWith('ar') || targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  renderArticleContent(article) {
    const { error } = this.props

    if (error) {
      return (
        <NetworkError error={error} onRetryClick={this.fetchArticle} />
      )
    }
    if (!article) {
      return null
    }

    const { htmlText } = article
    return (
      <div className="article">
        <Paper zDepth={2}>
          <article
            className="markdown-body"
            dir={this.getDir(article)}
            onClick={this.onTextClick}
            dangerouslySetInnerHTML={{ __html: htmlText }}
          ></article>
        </Paper>
      </div>
    )
  }

  render() {
    const { article } = this.props
    return (
      <div>
        <ChildAppBar
          title={article ? article.title : null}
          onBackClick={this.onBackClick}
          onSearchClick={this.onSearchClick}
        />
        {this.renderArticleContent(article)}
      </div>
    )
  }
}
