import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

import SearchAppBar from '../components/SearchAppBar'
import SearchBox from './SearchBox'

class SearchPageContainer extends Component {

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onItemSelected = this.onItemSelected.bind(this)
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

  onBackClick() {
    this.props.history.goBack()
  }

  onItemSelected(item) {
    console.log(item)
  }
}

export default SearchPageContainer
