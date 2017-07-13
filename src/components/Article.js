import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import ChildAppBar from './ChildAppBar'
import NetworkError from './NetworkError'
import './Article.css'

function Article(props) {

  const { article, error, onBackClick, onSearchClick, onRetryClick, handleSpeech } = props

  const onTextClick = (ev) => {
    if (ev.target.tagName === 'SPAN') {
      ev.preventDefault()
      ev.stopPropagation()
      const text = ev.target.innerText.trim()
      const { targetLang } = article._topic
      handleSpeech(text, targetLang)
    }
  }

  const getDir = (article) => {
    const { baseLang, targetLang } = article._topic
    return baseLang.startsWith('ar') || targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  const renderArticleContent = (article) => {

    if (error) {
      return (
        <NetworkError error={error} onRetryClick={onRetryClick} />
      )
    }

    if (!article) {
      return null
    }

    const { body } = article
    return (
      <div className="article">
        <Paper zDepth={2}>
          <article
            className="markdown-body"
            dir={getDir(article)}
            onClick={onTextClick}
            dangerouslySetInnerHTML={{ __html: body }}
          ></article>
        </Paper>
      </div>
    )
  }

  return (
    <div>
      <ChildAppBar
        title={article ? article.title : null}
        onBackClick={onBackClick}
        onSearchClick={onSearchClick}
      />
      {renderArticleContent(article)}
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.object,
  error: PropTypes.object,
  onBackClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onRetryClick: PropTypes.func,
  handleSpeech: PropTypes.func
}

const noop = () => undefined

Article.defaultProps = {
  article: null,
  loading: false,
  error: null,
  onBackClick: noop,
  onSearchClick: noop,
  onRetryClick: noop,
  handleSpeech: noop
}

export default Article
