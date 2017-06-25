import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import ChildAppBar from './ChildAppBar'
import ArticleListItem from './ArticleListItem'
import NetworkError from './NetworkError'

const noop = () => undefined

function ArticleListPage({ topics, error, onRetryClick, onItemClick, onSearchClick, onBackClick }) {

  const renderList = () => {
    if (error) {
      return (
        <NetworkError error={error} onRetryClick={onRetryClick} />
      )
    }
    if (!topics) {
      return null
    }
    return topics.slice(1).map(topic => (
      <ArticleListItem
        key={topic._id}
        topic={topic}
        onItemClick={onItemClick} />
    ))
  }

  const getDir = () => {
    if (!topics) {
      return 'ltr'
    }
    const index = topics[0]
    return index.baseLang.startsWith('ar') || index.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  return (
    <div>
      <ChildAppBar
        title={topics ? topics[0].title : null}
        onBackClick={onBackClick}
        onSearchClick={onSearchClick}
      />
      <List dir={getDir(topics)}>
        {renderList(topics)}
      </List>
    </div>
  )
}

ArticleListPage.propTypes = {
  topics: PropTypes.array,
  error: PropTypes.object,
  onRetryClick: PropTypes.func,
  onItemClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onBackClick: PropTypes.func
}

ArticleListPage.defaultProps = {
  topics: null,
  error: null,
  onRetryClick: noop,
  onItemClick: noop,
  onSearchClick: noop,
  onBackClick: noop
}

export default ArticleListPage
