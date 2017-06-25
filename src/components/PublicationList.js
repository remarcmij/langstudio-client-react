import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import MainAppBar from './MainAppBar'
import PublicationListItem from './PublicationListItem'
import NetworkError from './NetworkError'

function PublicationList(props) {

  const { topics, error, onRetryClick, onItemClick, onSearchClick } = props

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
        title="TaalMap Indonesisch"
        onSearchClick={onSearchClick}
      />
      <List>
        {renderList()}
      </List>
    </div>
  )
}

PublicationList.propTypes = {
  topics: PropTypes.array,
  error: PropTypes.object,
  onItemClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onRetryClick: PropTypes.func
}

const noop = () => undefined

PublicationList.defaultProps = {
  topics: null,
  error: null,
  onItemClick: noop,
  onSearchClick: noop,
  onRetryClick: noop
}

export default PublicationList
