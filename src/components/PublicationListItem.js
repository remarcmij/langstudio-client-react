import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const PublicationListItem = ({ publication, onTouchTap }) => (
  <div>
    <ListItem
      onTouchTap={() => onTouchTap(publication)}
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
  publication: PropTypes.object,
  onTouchTap: PropTypes.func
}

export default PublicationListItem
