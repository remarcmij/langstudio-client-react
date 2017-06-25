import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import MainAppBar from './MainAppBar'
import PublicationListItem from './PublicationListItem'
import NetworkError from './NetworkError'

const noop = () => undefined

export default class PublicationList extends React.Component {

  static propTypes = {
    topics: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchPublicationTopics: PropTypes.func.isRequired,
    fetchPublicationTopicsCancelled: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    onSearchClick: PropTypes.func
  }

  static defaultProps = {
    topics: null,
    loading: false,
    error: null,
    onItemClick: noop,
    onSearchClick: noop
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

  renderList() {
    const { topics, error, fetchPublicationTopics, onItemClick } = this.props
    if (error) {
      return (
        <NetworkError error={error} onRetryClick={fetchPublicationTopics} />
      )
    }
    if (!topics) {
      return null
    }
    return topics.map(topic => (
      <PublicationListItem
        key={topic._id}
        topic={topic}
        onItemClick={onItemClick} />
    ))
  }

  render() {
    return (
      <div>
        <MainAppBar
          title="TaalMap Indonesisch"
          onSearchClick={this.props.onSearchClick}
        />
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }
}
