import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

import SearchBox from './SearchBox'

class SearchPage extends Component {

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  render() {
    return (
      <div>
        <AppBar
          className="AppBar"
          title={<span>Search</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.onBackButtonTouchTap}>
              <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>
          }
        >
          <SearchBox onItemSelected={this.onItemSelected}/>
        </AppBar>
      </div>
    )
  }

  onBackButtonTouchTap = () => {
    this.props.history.goBack()
  }

  onItemSelected = (item) => {
    console.log(item)
  }
}

export default SearchPage
