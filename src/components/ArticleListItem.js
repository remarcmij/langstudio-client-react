import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const ArticleListItem = ({ article, onTouchTap }) => (
  <div>
    <ListItem
      onTouchTap={() => onTouchTap(article)}
      primaryText={article.title}
      secondaryText={
        <p>{article.subtitle}</p>
      }
      secondaryTextLines={2}
    />
    <Divider />
  </div>
)

ArticleListItem.propTypes = {
  article: PropTypes.object.isRequired,
  onTouchTap: PropTypes.func
}

ArticleListItem.defaultProps = {
  onTouchTap: () => undefined
}

export default ArticleListItem
