import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import './NetworkError.css'

function NetworkError({ error, onRetryClick }) {
  return (
    <Card className="network-error__card">
      <CardHeader
        title="A network error occurred"
        subtitle={'Error: ' + error.message}
      />
      <CardActions>
        <FlatButton label="Retry" onClick={onRetryClick} />
      </CardActions>
    </Card>
  )
}

NetworkError.propTypes = {
  error: PropTypes.object.isRequired,
  onRetryClick: PropTypes.func
}

NetworkError.defaultProps = {
  onRetryClick: () => undefined
}

export default NetworkError
