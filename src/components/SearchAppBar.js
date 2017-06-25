import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

function SearchAppBar({ title, onBackClick, children }) {
  return (
    <AppBar
      className="AppBar"
      title={title}
      iconElementLeft={
        <IconButton onTouchTap={onBackClick}>
          <FontIcon className="material-icons">arrow_back</FontIcon>
        </IconButton>
      }
    >
      {children}
    </AppBar>
  )
}

SearchAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  onBackClick: PropTypes.func,
  children: PropTypes.object,
}

const noop = () => undefined

SearchAppBar.defaultProps = {
  onBackClick: noop,
  children: null
}

export default SearchAppBar
