import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

function ArticleListItem({ topic, onItemClick }) {
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

ArticleListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onItemClick: PropTypes.func
}

const noop = () => undefined

ArticleListItem.defaultProps = {
  onItemClick: noop
}

export default ArticleListItem
