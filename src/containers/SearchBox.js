import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import config from '../config/config'

export default class SearchBox extends Component {

  static propTypes = {
    onItemSelected: PropTypes.func
  }

  _autoCompleteSearch = new Subject()
  _unsubscribe = new Subject()

  constructor(props) {
    super(props)

    this.state = {
      dataSource: []
    }

    this._autoCompleteSearch
      .debounceTime(250)
      .switchMap(term => Observable.ajax(`${config.apiEndPoint}/search/autocomplete?term=${term}`))
      .map(res => res.response)
      .takeUntil(this._unsubscribe)
      .subscribe(data => {
        const dataSource = data.map(item => ({
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

  }

  componentWillUnmount() {
    this._unsubscribe.next()
    this._unsubscribe.complete()
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
    this._autoCompleteSearch.next(term)
  }

  onNewRequest = (chosenRequest, index) => {
    const { item } = index === -1 ? this.state.dataSource[0] : chosenRequest
    this.props.onItemSelected(item)
  }

}
