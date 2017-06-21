import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

import { fetchAutoCompleteItems } from '../actions/index'

class SearchBox extends Component {

  static propTypes = {
    autoCompleteItems: PropTypes.array,
    fetchAutoCompleteItems: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      term: ''
    }

    this.onUpdateInput = debounce(this.onUpdateInput, 250)
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps', nextProps)
  //   this.setState({ dataSource: nextProps.autoCompleteItems })
  // }

  render() {
    console.log('render', this.props.autoCompleteItems)
    return (
      <div>
        <AutoComplete
          hintText="Search"
          dataSource={this.props.autoCompleteItems}
          dataSourceConfig={({ text: 'word', value: 'word' })}
          onUpdateInput={this.onUpdateInput}
          onNewRequest={this.onNewRequest}
        />
      </div>
    )
  }

  performSearch() {
    const term = this.state.term.trim()
    if (term) {
      this.props.fetchAutoCompleteItems(term)
    }
  }

  onUpdateInput = (term) => {
    this.setState({ term }, () => this.performSearch())
  }

  onNewRequest = (chosenRequest, index) => {
    console.log('state', this.state)
    const { dataSource } = this.state
    let item = null
    if (dataSource.length) {
      item = index === -1 ? dataSource[0] : dataSource[index]
    }
    console.log(item)
  }

}

function mapStateToProps(state) {
  return {
    autoCompleteItems: state.autoCompleteItems,
    fetchAutoCompleteItems: state.fetchAutoCompleteItems
  }
}

export default connect(mapStateToProps, { fetchAutoCompleteItems })(SearchBox)
