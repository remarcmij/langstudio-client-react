import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PublicationListPage from '../components/PublicationListPage'
import * as actions from '../actions/publicationList'
import * as selectors from '../selectors/publicationList'

class PublicationListContainer extends Component {

  static propTypes = {
    publications: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchPublicationList: PropTypes.func,
    fetchPublicationListCancelled: PropTypes.func,
    history: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.onItemClick = this.onItemClick.bind(this)
    this.onRetryClick = this.onRetryClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
  }

  componentDidMount() {
    const { publications, fetchPublicationList } = this.props
    if (!publications) {
      fetchPublicationList()
    }
  }

  componentWillUnmount() {
    const { loading, fetchPublicationListCancelled } = this.props
    if (loading) {
      fetchPublicationListCancelled()
    }
  }

  render() {
    const { publications, error } = this.props
    return (
      <PublicationListPage
        title="TaalMap Indonesisch"
        publications={publications}
        error={error}
        onRetryClick={this.onRetryClick}
        onItemClick={this.onItemClick}
        onSearchClick={this.onSearchClick}
      />
    )
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
}

const mapStateToProps = (state) => ({
  publications: selectors.getPublications(state),
  loading: selectors.getLoading(state),
  error: selectors.getError(state)
})

export default connect(mapStateToProps, {
  fetchPublicationList: actions.fetchPublicationList,
  fetchPublicationListCancelled: actions.fetchPublicationListCancelled
})(PublicationListContainer)
