import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import PublicationListItem from '../components/PublicationListItem'
import { fetchPublications, fetchPublicationsCancelled } from '../actions'

class PublicationList extends Component {

  static propTypes = {
    topics: PropTypes.array,
    fetchPublications: PropTypes.func,
    fetchPublicationsCancelled: PropTypes.func,
    history: PropTypes.object
  }

  componentDidMount() {
    this.props.fetchPublications()
  }

  componentWillUnmount() {
    this.props.fetchPublicationsCancelled()
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
          iconElementRight={
            <IconButton onTouchTap={this.onSearchButtonTouchTap}>
              <FontIcon className="material-icons">search</FontIcon>
            </IconButton>
          }
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

  onSearchButtonTouchTap = () => {
    this.props.history.push(`/search`)
  }

}

function mapStateToProps(state) {
  return {
    topics: state.publicationTopics
  }
}

export default connect(mapStateToProps, {
  fetchPublications,
  fetchPublicationsCancelled
})(PublicationList)
