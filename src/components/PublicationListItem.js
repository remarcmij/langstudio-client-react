import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const noop = () => undefined

const PublicationListItem = ({ publication, onItemClick }) => (
  <div>
    <ListItem
      onTouchTap={() => onItemClick(publication)}
      primaryText={publication.title}
      secondaryText={
        <p>{publication.subtitle}</p>
      }
      secondaryTextLines={2}
    />
    <Divider />
  </div>
)

PublicationListItem.propTypes = {
  publication: PropTypes.object.isRequired,
  onItemClick: PropTypes.func
}

PublicationListItem.defaultProps = {
  onItemClick: noop
}

export default PublicationListItem
