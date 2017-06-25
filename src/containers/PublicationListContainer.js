import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PublicationListPage from '../components/PublicationListPage'
import * as actions from '../actions/publicationList'
import * as selectors from '../selectors/publicationList'

class PublicationListContainer extends Component {

  static propTypes = {
    topics: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchPublicationList: PropTypes.func.isRequired,
    fetchPublicationListCancelled: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  static defaultProps = {
    topics: null,
    loading: false,
    error: null
  }

  constructor(props) {
    super(props)
    this.onItemClick = this.onItemClick.bind(this)
    this.onRetryClick = this.onRetryClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
  }

  componentDidMount() {
    const { topics, fetchPublicationList } = this.props
    if (!topics) {
      fetchPublicationList()
    }
  }

  componentWillUnmount() {
    const { loading, fetchPublicationListCancelled } = this.props
    if (loading) {
      fetchPublicationListCancelled()
    }
  }

  onRetryClick() {
    this.props.fetchPublicationList()
  }

  onItemClick(topic) {
    this.props.history.push(`/content/${topic.publication}`)
  }

  onSearchClick() {
    this.props.history.push(`/search`)
  }

  render() {
    const { topics, error } = this.props
    return (
      <PublicationListPage
        title="TaalMap Indonesisch"
        topics={topics}
        error={error}
        onRetryClick={this.onRetryClick}
        onItemClick={this.onItemClick}
        onSearchClick={this.onSearchClick}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  topics: selectors.getTopics(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

export default connect(mapStateToProps, {
  fetchPublicationList: actions.fetchPublicationList,
  fetchPublicationListCancelled: actions.fetchPublicationListCancelled
})(PublicationListContainer)
