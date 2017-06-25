import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

function PublicationListItem({ topic, onItemClick }) {
  return (
    <div>
      <ListItem
        onTouchTap={() => onItemClick(topic)}
        primaryText={topic.title}
        secondaryText={
          <p>{topic.subtitle}</p>
        }
        secondaryTextLines={2}
      />
      <Divider />
    </div>
  )
}

PublicationListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onItemClick: PropTypes.func
}

const noop = () => undefined

PublicationListItem.defaultProps = {
  onItemClick: noop
}

export default PublicationListItem
