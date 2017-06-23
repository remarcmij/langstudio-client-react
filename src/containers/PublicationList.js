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
    publications: PropTypes.array,
    fetchPublications: PropTypes.func,
    fetchPublicationsCancelled: PropTypes.func,
    history: PropTypes.object
  }

  componentDidMount() {
    if (!this.props.publications) {
      this.props.fetchPublications()
    }
  }

  componentWillUnmount() {
    this.props.fetchPublicationsCancelled()
  }

  renderList(publications) {
    if (!publications) {
      return null
    }
    return publications.map(publication => (
      <PublicationListItem
        key={publication._id}
        publication={publication}
        onTouchTap={this.onPublicationItemTouchTap} />
    ))
  }

  render() {
    const { publications } = this.props
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
          {this.renderList(publications)}
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

function mapStateToProps({ publications }) {
  return { publications }
}

export default connect(mapStateToProps, {
  fetchPublications,
  fetchPublicationsCancelled
})(PublicationList)
