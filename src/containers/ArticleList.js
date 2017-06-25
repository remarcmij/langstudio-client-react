import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ArticleList from '../components/ArticleList'
import * as actions from '../actions/articleList'
import {getTopics, getLoading, getError} from '../reducers/articleList'

function ArticleListWrapper(props) {
  const { history, match } = props

  const onBackClick = () => {
    history.push('/')
  }

  const onSearchClick = () => {
    history.push('/search')
  }

  const onItemClick = (topic) => {
    history.push(`/content/${topic.publication}/${topic.chapter}`)
  }

  return (
    <ArticleList
      publication={match.params.publication}
      onBackClick={onBackClick}
      onSearchClick={onSearchClick}
      onItemClick={onItemClick}
      {...props}
    />
  )
}

ArticleListWrapper.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, { match }) => ({
  topics: getTopics(state, match.params.publication),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchArticleTopics(publication) {
    dispatch(actions.fetchArticleTopics(publication))
  },
  fetchArticleTopicsCancelled() {
    dispatch(actions.fetchArticleTopicsCancelled())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListWrapper)
