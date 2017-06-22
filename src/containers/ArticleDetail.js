import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import ArticleContent from '../components/ArticleContent'
import { fetchArticleContent } from '../actions'

class ArticleDetail extends Component {

  static propTypes = {
    article: PropTypes.object,
    fetchArticleContent: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount() {
    const { publication, chapter } = this.props.match.params
    this.props.fetchArticleContent(publication, chapter)
  }

  render() {
    return (
      <div>
        <AppBar
          className="AppBar"
          title={<span>Article</span>}
          iconElementLeft={
            <IconButton onTouchTap={this.onBackButtonTouchTap}>
              <FontIcon className="material-icons">arrow_back</FontIcon>
            </IconButton>
          }
          iconElementRight={
            <IconButton onTouchTap={this.onSearchButtonTouchTap}>
              <FontIcon className="material-icons">search</FontIcon>
            </IconButton>
          }

        />
        <ArticleContent article={this.props.article} />
      </div>
    )
  }

  onBackButtonTouchTap = () => {
    this.props.history.push(`/content/${this.props.match.params.publication}`)
  }

  onSearchButtonTouchTap = () => {
    this.props.history.push(`/search`)
  }

}

function mapStateToProps(state) {
  return {
    article: state.articleContent
  }
}

export default connect(mapStateToProps, { fetchArticleContent })(ArticleDetail)
