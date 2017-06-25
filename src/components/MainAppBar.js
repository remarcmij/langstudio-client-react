import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

const noop = () => undefined

function MainAppBar({ title, onSearchClick }) {
  return (
    <AppBar
      className="AppBar"
      title={title}
      iconElementRight={
        <IconButton onTouchTap={onSearchClick}>
          <FontIcon className="material-icons">search</FontIcon>
        </IconButton>
      }
    />
  )
}

MainAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  onSearchClick: PropTypes.func
}

MainAppBar.defaultProps = {
  onSearchClick: noop
}

export default MainAppBar
