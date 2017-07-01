import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

function ArticleListItem({ topic, onItemClick }) {
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

ArticleListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onItemClick: PropTypes.func
}

const noop = () => undefined

ArticleListItem.defaultProps = {
  onItemClick: noop
}

export default ArticleListItem
