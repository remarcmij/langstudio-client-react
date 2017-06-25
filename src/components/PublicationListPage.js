import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import MainAppBar from './MainAppBar'
import PublicationListItem from './PublicationListItem'
import NetworkError from './NetworkError'

const noop = () => undefined

function PublicationListPage({ title, topics, error, onRetryClick, onItemClick, onSearchClick }) {

  const renderList = () => {
    if (error) {
      return (
        <NetworkError error={error} onRetryClick={onRetryClick} />
      )
    }
    if (!topics) {
      return null
    }
    return topics.map(topic => (
      <PublicationListItem
        key={topic._id}
        topic={topic}
        onItemClick={onItemClick} />
    ))
  }

  return (
    <div>
      <MainAppBar
        title={title}
        onSearchClick={onSearchClick}
      />
      <List>
        {renderList()}
      </List>
    </div>
  )
}

PublicationListPage.propTypes = {
  title: PropTypes.string,
  topics: PropTypes.array,
  error: PropTypes.object,
  onRetryClick: PropTypes.func,
  onItemClick: PropTypes.func,
  onSearchClick: PropTypes.func
}

PublicationListPage.defaultProps = {
  title: '',
  topics: null,
  error: null,
  onRetryClick: noop,
  onItemClick: noop,
  onSearchClick: noop
}

export default PublicationListPage
