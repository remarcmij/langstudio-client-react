import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import { List } from 'material-ui/List'

import PublicationListItem from '../components/PublicationListItem'
import { fetchPublicationTopics } from '../actions/index'

class PublicationList extends Component {

  static propTypes = {
    topics: PropTypes.array,
    fetchPublicationTopics: PropTypes.func,
    history: PropTypes.object
  }

  componentDidMount() {
    this.props.fetchPublicationTopics()
  }

  renderList(topics) {
    if (!topics) {
      return null
    }
    return topics.map(topic => (
      <PublicationListItem
        key={topic._id}
        topic={topic}
        onTouchTap={this.onPublicationItemTouchTap} />
    ))
  }

  render() {
    const { topics } = this.props
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

  onPublicationItemTouchTap = (topic) => {
    this.props.history.push(`/content/${topic.publication}`)
  }
}

function mapStateToProps(state) {
  return {
    topics: state.publicationTopics
  }
}

export default connect(mapStateToProps, { fetchPublicationTopics })(PublicationList)
