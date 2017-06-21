import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import debounce from 'lodash.debounce'
import axios from 'axios'

import config from '../config/config'

export default class SearchBox extends Component {

  static propTypes = {
    onItemSelected: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      dataSource: []
    }

    this.onUpdateInput = debounce(this.onUpdateInput, 250)
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

  performSearch(term) {
    if (!term) {
      return this.setState({ dataSource: [] })
    }

    axios.get(`${config.apiEndPoint}/search/autocomplete?term=${term}`)
      .then(res => {
        const dataSource = res.data.map(item => ({
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
      })
      .catch(err => console.log(err))
  }

  onUpdateInput = (term) => {
    this.performSearch(term.trim())
  }

  onNewRequest = (chosenRequest, index) => {
    const { item } = index === -1 ? this.state.dataSource[0] : chosenRequest
    this.props.onItemSelected(item)
  }

}
