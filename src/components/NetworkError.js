import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import './NetworkError.css'

const emptyFunction = () => undefined

const NetworkError = ({ error, retry = emptyFunction }) => {
  return (
    <Card className="NetworkError__Card">
      <CardHeader
        title="A network error occurred"
        subtitle={'Error: ' + error.message}
      />
      <CardActions>
        <FlatButton label="Retry" onClick={retry} />
      </CardActions>
    </Card>
  )
}

NetworkError.propTypes = {
  error: PropTypes.object,
  retry: PropTypes.func
}

export default NetworkError
