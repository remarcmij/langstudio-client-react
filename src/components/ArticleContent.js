import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import speechService from '../services/speechService'
import './ArticleContent.css'

const ArticleContent = props => {

  function getDir() {
    const { baseLang, targetLang } = props.article._topic
    return baseLang.startsWith('ar') || targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  function onClick(ev) {
    if (speechService.isSpeechSynthesisSupported) {
      if (ev.target.tagName === 'SPAN') {
        ev.preventDefault()
        ev.stopPropagation()
        const text = ev.target.innerText.trim()
        const { targetLang } = props.article._topic
        speechService.speak(text, targetLang)
      }
    }
  }

  const { htmlText } = props.article

  return (
    <div className="Article">
      <Paper zDepth={2}>
        <article
          className="markdown-body"
          dir={getDir()}
          onClick={onClick}
          dangerouslySetInnerHTML={{ __html: htmlText }}
        />
      </Paper>
    </div>
  )
}

ArticleContent.propTypes = {
  article: PropTypes.object,
  onClick: PropTypes.func
}

export default ArticleContent
