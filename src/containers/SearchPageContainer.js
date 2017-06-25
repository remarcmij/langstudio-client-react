import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

import SearchAppBar from '../components/SearchAppBar'
import SearchBox from './SearchBox'

class SearchPageContainer extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onItemSelected = this.onItemSelected.bind(this)
  }

  onBackClick() {
    this.props.history.goBack()
  }

  onItemSelected(item) {
    console.log(item)
  }

  render() {
    return (
      <div>
        <SearchAppBar title="Search" onBackClick={this.onBackClick}>
          <SearchBox onItemSelected={this.onItemSelected} />
        </SearchAppBar>
      </div>
    )
  }
}

export default SearchPageContainer
