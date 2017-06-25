import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

const noop = () => undefined

export default class SearchBox extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    onItemSelected: PropTypes.func,
    fetchAutoCompleteList: PropTypes.func.isRequired
  }

  static defaultProps = {
    items: null,
    loading: false,
    error: null,
    onItemSelected: noop
  }

  constructor(props) {
    super(props)
    this.onUpdateInput = this.onUpdateInput.bind(this)
    this.onNewRequest = this.onNewRequest.bind(this)
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      document.querySelector('.search-box__auto-complete input').focus()
    }, 100)
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

  onUpdateInput(term) {
    term = term.trim()
    if (!term) {
      return this.setState({ dataSource: [] })
    }
    this.props.fetchAutoCompleteList(term)
  }

  onNewRequest(chosenRequest, index) {
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

  render () {
    // animated needs to be false for Chrome 56+
    // see: https://developers.google.com/web/updates/2017/01/scrolling-intervention
    return (
      <div>
        <AutoComplete
          className="search-box__auto-complete"
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
}

