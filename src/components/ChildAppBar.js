import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

const noop = () => undefined

function ChildAppBar({ title, onBackClick, onSearchClick }) {
  return (
    <AppBar
      className="AppBar"
      title={title}
      iconElementLeft={
        <IconButton onTouchTap={onBackClick}>
          <FontIcon className="material-icons">arrow_back</FontIcon>
        </IconButton>
      }
      iconElementRight={
        <IconButton onTouchTap={onSearchClick}>
          <FontIcon className="material-icons">search</FontIcon>
        </IconButton>
      }
    />
  )
}

ChildAppBar.propTypes = {
  title: PropTypes.string,
  onBackClick: PropTypes.func,
  onSearchClick: PropTypes.func
}

ChildAppBar.defaultProps = {
  title: '',
  onBackClick: noop,
  onSearchClick: noop
}

export default ChildAppBar
