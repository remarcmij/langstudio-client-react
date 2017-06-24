import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import './ArticleContent.css'

const noop = () => undefined

const ArticleContent = ({article, onTextClick}) => {

  function getDir() {
    const { baseLang, targetLang } = article._topic
    return baseLang.startsWith('ar') || targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  const { htmlText } = article

  return (
    <div className="article-content">
      <Paper zDepth={2}>
        <article
          className="markdown-body"
          dir={getDir()}
          onClick={onTextClick}
          dangerouslySetInnerHTML={{ __html: htmlText }}
        />
      </Paper>
    </div>
  )
}

ArticleContent.propTypes = {
  article: PropTypes.object.isRequired,
  onTextClick: PropTypes.func
}

ArticleContent.defaultProps = {
  onTextClick: noop
}

export default ArticleContent
