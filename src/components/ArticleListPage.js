import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import ChildAppBar from './ChildAppBar'
import ArticleListItem from './ArticleListItem'
import NetworkError from './NetworkError'

const noop = () => undefined

const ArticleListPage = ({ articles, error, onRetryClick, onItemClick, onSearchClick, onBackClick }) => {

  const renderList = () => {
    if (error) {
      return (
        <NetworkError error={error} onRetryClick={onRetryClick} />
      )
    }
    if (!articles) {
      return null
    }
    return articles.slice(1).map(article => (
      <ArticleListItem
        key={article._id}
        article={article}
        onTouchTap={onItemClick} />
    ))
  }

  const getDir = () => {
    if (!articles) {
      return 'ltr'
    }
    const index = articles[0]
    return index.baseLang.startsWith('ar') || index.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  return (
    <div>
      <ChildAppBar
        title={articles ? articles[0].title : null}
        onBackClick={onBackClick}
        onSearchClick={onSearchClick}
      />
      <List dir={getDir(articles)}>
        {renderList(articles)}
      </List>
    </div>
  )
}

ArticleListPage.propTypes = {
  articles: PropTypes.array,
  error: PropTypes.object,
  onRetryClick: PropTypes.func,
  onItemClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onBackClick: PropTypes.func
}

ArticleListPage.defaultProps = {
  articles: null,
  error: null,
  onRetryClick: noop,
  onItemClick: noop,
  onSearchClick: noop,
  onBackClick: noop
}

export default ArticleListPage
