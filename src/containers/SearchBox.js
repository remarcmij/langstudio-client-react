import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

import { fetch } from '../actions/autoCompleteList'
import * as selectors from '../selectors/autoCompleteList'

class SearchBox extends Component {

  static propTypes = {
    onItemSelected: PropTypes.func,
    fetch: PropTypes.func,
    items: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object
  }

  state = {
    dataSource: []
  }

  componentWillReceiveProps({ items, loading, error }) {
    if (loading || error) {
      return
    }

    const dataSource = items.map(item => ({
      item,
      text: item.word,
      value: (
        <MenuItem
          primaryText={item.word}
          secondaryText={item.lang}
        />
      )
    }))
    this.setState({ dataSource })
  }

  render() {
    // animated needs to be false for Chrome 56+
    // see: https://developers.google.com/web/updates/2017/01/scrolling-intervention
    return (
      <div>
        <AutoComplete
          hintText="Search"
          animated={false}
          filter={AutoComplete.noFilter}
          dataSource={this.state.dataSource}
          onUpdateInput={this.onUpdateInput}
          onNewRequest={this.onNewRequest}
        />
      </div>
    )
  }

  onUpdateInput = (term) => {
    term = term.trim()
    if (!term) {
      return this.setState({ dataSource: [] })
    }
    this.props.fetch(term)
  }

  onNewRequest = (chosenRequest, index) => {
    const { dataSource } = this.state
    if (index === -1) {
      if (dataSource.length > 0) {
        this.props.onItemSelected(dataSource[0])
      }
    } else {
      this.props.onItemSelected(chosenRequest)
    }
  }
}

function mapStateToProps(state) {
  return {
    items: selectors.getItems(state),
    loading: selectors.getLoading(state),
    error: selectors.getError(state)
  }
}

export default connect(mapStateToProps, { fetch })(SearchBox)
