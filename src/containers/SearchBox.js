import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

import * as actions from '../actions/autoCompleteList'
import * as selectors from '../selectors/autoCompleteList'
import './SearchBox.css'

class SearchBox extends Component {

  static propTypes = {
    onItemSelected: PropTypes.func,
    fetchAutoCompleteList: PropTypes.func,
    items: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object
  }

  static defaultProps = {
    onItemSelected: () => undefined
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
          className="search-box--auto-complete"
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
    this.props.fetchAutoCompleteList(term)
  }

  onNewRequest = (chosenRequest, index) => {
    const { dataSource } = this.state
    const { onItemSelected } = this.props
    if (index === -1) {
      if (dataSource.length > 0) {
        onItemSelected(dataSource[0])
      }
    } else {
      onItemSelected(chosenRequest)
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

export default connect(mapStateToProps, {
  fetchAutoCompleteList: actions.fetchAutoCompleteList
})(SearchBox)
