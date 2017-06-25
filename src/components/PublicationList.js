import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import MainAppBar from './MainAppBar'
import PublicationListItem from './PublicationListItem'
import NetworkError from './NetworkError'

export default class PublicationList extends React.Component {

  static propTypes = {
    topics: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchPublicationTopics: PropTypes.func.isRequired,
    fetchPublicationTopicsCancelled: PropTypes.func.isRequired,
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
    this.props.history.push(`/search`)
  }

  renderList() {
    const { topics, error, fetchPublicationTopics } = this.props
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
        onItemClick={this.onItemClick} />
    ))
  }

  render() {
    return (
      <div>
        <MainAppBar
          title="TaalMap Indonesisch"
          onSearchClick={this.onSearchClick}
        />
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }
}
