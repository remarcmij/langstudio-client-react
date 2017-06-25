import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Article from '../components/Article'
import * as actions from '../actions/article'
import {getArticle, getLoading, getError} from '../reducers/article'

function ArticleWrapper(props) {
  const { history, match } = props

  const onBackClick = () => {
    history.push('/')
  }

  const onSearchClick = () => {
    history.push('/search')
  }

  const { publication, chapter } = match.params

  return (
    <Article
      publication={publication}
      chapter={chapter}
      onBackClick={onBackClick}
      onSearchClick={onSearchClick}
      {...props}
    />
  )
}

ArticleWrapper.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  article: getArticle(state),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchArticle(publication, chapter) {
    dispatch(actions.fetchArticle(publication, chapter))
  },
  fetchArticleCancelled() {
    dispatch(actions.fetchArticleCancelled())
  },
  clearArticle() {
    dispatch(actions.clearArticle())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleWrapper)
