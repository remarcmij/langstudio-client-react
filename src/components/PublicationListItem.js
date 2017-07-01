import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

function PublicationListItem({ topic, onItemClick }) {
  const { title, subtitle } = topic
  const secondaryText = subtitle ? (<p>{subtitle}</p>) : null
  return (
    <div>
      <ListItem
        onTouchTap={() => onItemClick(topic)}
        primaryText={title}
        secondaryText={secondaryText}
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
