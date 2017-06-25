import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PublicationList from '../components/PublicationList'
import * as actions from '../actions/publicationList'
import { getTopics, getLoading, getError } from '../reducers/publicationList'

class PublicationListWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.onItemClick = this.onItemClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
  }

  componentDidMount() {
    const { topics, fetchPublicationTopics } = this.props
    if (!topics) {
      fetchPublicationTopics()
    }
  }

  componentWillUnmount() {
    const { loading, fetchPublicationTopicsCancelled } = this.props
    if (loading) {
      fetchPublicationTopicsCancelled()
    }
  }

  onItemClick(topic) {
    this.props.history.push(`/content/${topic.publication}`)
  }

  onSearchClick() {
    this.props.history.push('/search')
  }

  render() {
    return (
      <PublicationList
        onItemClick={this.onItemClick}
        onSearchClick={this.onSearchClick}
        onRetryClick={this.props.fetchPublicationTopics}
        {...this.props}
      />
    )
  }
}

PublicationListWrapper.propTypes = {
  topics: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  fetchPublicationTopics: PropTypes.func.isRequired,
  fetchPublicationTopicsCancelled: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

PublicationListWrapper.defaultProps = {
  topics: null,
  loading: false,
  error: null
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
