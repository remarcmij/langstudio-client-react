import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PublicationList from '../components/PublicationList'
import * as actions from '../actions/publicationList'
import { getTopics, getLoading, getError } from '../reducers/publicationList'

function PublicationListWrapper(props) {
  const { history } = props

  const onItemClick = (topic) => {
    history.push(`/content/${topic.publication}`)
  }

  const onSearchClick = () => {
    history.push('/search')
  }

  return (
    <PublicationList
      onItemClick={onItemClick}
      onSearchClick={onSearchClick}
      {...props}
    />
  )
}

PublicationListWrapper.propTypes = {
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  topics: getTopics(state),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchPublicationTopics() {
    dispatch(actions.fetchPublicationTopics())
  },
  fetchPublicationTopicsCancelled() {
    dispatch(actions.fetchPublicationTopicsCancelled())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicationListWrapper)
