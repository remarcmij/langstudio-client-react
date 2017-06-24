import React from 'react'
import PropTypes from 'prop-types'

import ChildAppBar from './ChildAppBar'
import ArticleContent from './ArticleContent'
import NetworkError from './NetworkError'

const noop = () => undefined

const ArticlePage = ({ article, error, onTextClick, onSearchClick, onBackClick, onRetryClick }) => {

  const renderArticleContent = () => {
    if (error) {
      return (
        <NetworkError error={error} onRetryClick={onRetryClick} />
      )
    }
    if (!article) {
      return null
    }
    return (
      <ArticleContent article={article} onTextClick={onTextClick} />
    )
  }

  return (
    <div>
      <ChildAppBar
        title={article ? article.title : null}
        onBackClick={onBackClick}
        onSearchClick={onSearchClick}
      />
      {renderArticleContent()}
    </div>
  )
}

ArticlePage.propTypes = {
  article: PropTypes.object,
  error: PropTypes.object,
  onTextClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onBackClick: PropTypes.func,
  onRetryClick: PropTypes.func
}

ArticlePage.defaultProps = {
  error: null,
  onTextClick: noop,
  onSearchClick: noop,
  onBackClick: noop,
  onRetryClick: noop,
}

export default ArticlePage
