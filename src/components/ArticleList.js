import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import ChildAppBar from './ChildAppBar'
import ArticleListItem from './ArticleListItem'
import NetworkError from './NetworkError'

function ArticleList(props) {

  const { topics, error, onRetryClick, onItemClick, onBackClick, onSearchClick } = props

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
        onItemClick={() => onItemClick(topic)} />
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

ArticleList.propTypes = {
  topics: PropTypes.array,
  error: PropTypes.object,
  onBackClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onItemClick: PropTypes.func,
  onRetryClick: PropTypes.func
}

const noop = () => undefined

ArticleList.defaultProps = {
  topics: null,
  error: null,
  onBackClick: noop,
  onSearchClick: noop,
  onItemClick: noop,
  onRetryClick: noop
}

export default ArticleList
