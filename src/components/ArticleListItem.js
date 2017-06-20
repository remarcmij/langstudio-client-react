import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const ArticleListItem = ({ topic, onTouchTap }) => (
  <div>
    <ListItem
      onTouchTap={() => onTouchTap(topic)}
      primaryText={topic.title}
      secondaryText={
        <p>{topic.subtitle}</p>
      }
      secondaryTextLines={2}
    />
    <Divider />
  </div>
)

ArticleListItem.propTypes = {
  topic: PropTypes.object,
  onTouchTap: PropTypes.func
}

export default ArticleListItem
