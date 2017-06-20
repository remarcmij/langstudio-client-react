import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import { List } from 'material-ui/List'

import PublicationListItem from '../components/PublicationListItem'
import { fetchPublicationTopics } from '../actions/index'

class PublicationList extends Component {

  static propTypes = {
    topics: PropTypes.object,
    fetchPublicationTopics: PropTypes.func,
    history: PropTypes.object
  }

  get topics() {
    const { topics } = this.props
    return topics['index']
  }

  componentWillMount() {
    if (!this.topics) {
      this.props.fetchPublicationTopics()
    }
  }

  renderList(topics) {
    if (!topics) {
      return null
    }
    return topics.map(topic => (
      <PublicationListItem
        key={topic._id}
        topic={topic}
        onTouchTap={this.onTouchTap.bind(this)} />
    ))
  }

  render() {
   const topics = this.topics
    return (
      <div>
        <AppBar
          className="AppBar"
          title="TaalMap Indonesisch"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <List>
          {this.renderList(topics)}
        </List>
      </div>
    )
  }

  onTouchTap(topic) {
    this.props.history.push(`/articles/${topic.publication}`)
  }
}

function mapStateToProps(state) {
  return {
    topics: state.publicationTopics
  }
}

export default connect(mapStateToProps, { fetchPublicationTopics })(PublicationList)
