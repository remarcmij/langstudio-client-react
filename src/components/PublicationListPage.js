import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import MainAppBar from './MainAppBar'
import PublicationListItem from './PublicationListItem'
import NetworkError from './NetworkError'

const noop = () => undefined

const PublicationListPage = ({ title, publications, error, onRetryClick, onItemClick, onSearchClick }) => {

  const renderList = () => {
    if (error) {
      return (
        <NetworkError error={error} onRetryClick={onRetryClick} />
      )
    }
    if (!publications) {
      return null
    }
    return publications.map(publication => (
      <PublicationListItem
        key={publication._id}
        publication={publication}
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
  title: PropTypes.string.isRequired,
  publications: PropTypes.array,
  error: PropTypes.object,
  onRetryClick: PropTypes.func,
  onItemClick: PropTypes.func,
  onSearchClick: PropTypes.func
}

PublicationListPage.defaultProps = {
  onRetryClick: noop,
  onItemClick: noop,
  onSearchClick: noop
}

export default PublicationListPage
