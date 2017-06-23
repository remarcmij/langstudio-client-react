import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import PublicationListItem from '../components/PublicationListItem'
import { fetch, fetchCancelled } from '../actions/publicationList'
import { getPublicationList } from '../selectors/publicationList'

class PublicationList extends Component {

  static propTypes = {
    publicationList: PropTypes.array,
    fetch: PropTypes.func,
    fetchCancelled: PropTypes.func,
    history: PropTypes.object
  }

  componentDidMount() {
    if (!this.props.publicationList) {
      this.props.fetch()
    }
  }

  componentWillUnmount() {
    this.props.fetchCancelled()
  }

  renderList() {
    const { publicationList } = this.props
    if (!publicationList) {
      return null
    }
    return publicationList.map(publication => (
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
  return { publicationList: getPublicationList(state) }
}

export default connect(mapStateToProps, {
  fetch,
  fetchCancelled
})(PublicationList)
