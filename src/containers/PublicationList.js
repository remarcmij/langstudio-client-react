// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import { List } from 'material-ui/List'

import PublicationListItem from '../components/PublicationListItem'
import { fetchPublicationTopics } from '../actions/index'

class PublicationList extends Component {

  props: {
    onTouchTap: function,
    topics: Array<any>

  }
  constructor(props) {
    super(props)
    this.onTouchTap = this.onTouchTap.bind(this)
    this.topics = this.props.publicationTopics['index']
  }

  componentWillMount() {
    if (!this.topics) {
      this.props.fetchPublicationTopics()
    }
  }

  renderList() {
    if (!this.topics) {
      return null
    }
    return this.topics.map(topic => (
      <PublicationListItem
        key={topic._id}
        topic={topic}
        onTouchTap={this.onTouchTap} />
    ))
  }

  render() {
    this.topics = this.props.publicationTopics['index']
    return (
      <div>
        <AppBar
          className="AppBar"
          title="TaalMap Indonesisch"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <List>
          {this.renderList()}
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
    publicationTopics: state.publicationTopics
  }
}

export default connect(mapStateToProps, { fetchPublicationTopics })(PublicationList)
