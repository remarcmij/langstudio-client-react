import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import PublicationListItem from '../components/PublicationListItem'
import NetworkError from '../components/NetworkError'
import * as actions from '../actions/publicationList'
import * as selectors from '../selectors/publicationList'

class PublicationList extends Component {

  static propTypes = {
    publications: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetch: PropTypes.func,
    fetchCancelled: PropTypes.func,
    history: PropTypes.object
  }

  componentDidMount() {
    if (!this.props.publications) {
      this.props.fetch()
    }
  }

  componentWillUnmount() {
    const { loading, fetchCancelled } = this.props
    if (loading) {
      fetchCancelled()
    }
  }

  renderList() {
    const { error, publications, fetch } = this.props
    if (error) {
      return (
        <NetworkError error={error} retry={fetch} />
      )
    }
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
          {this.renderList()}
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
    publications: selectors.getPublications(state),
    loading: selectors.getLoading(state),
    error: selectors.getError(state)
  }
}

export default connect(mapStateToProps, {
  fetch: actions.fetch,
  fetchCancelled: actions.fetchCancelled
})(PublicationList)
