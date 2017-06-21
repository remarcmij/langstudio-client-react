import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import ArticleListItem from '../components/ArticleListItem'
import { fetchArticleTopics } from '../actions/index'

class ArticleList extends Component {

  static propTypes = {
    topics: PropTypes.array,
    fetchArticleTopics: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount() {
    const { publication } = this.props.match.params
    this.props.fetchArticleTopics(publication)
  }

  renderList(topics) {
    if (!topics) {
      return null
    }
    return topics.slice(1).map(topic => (
      <ArticleListItem
        key={topic._id}
        topic={topic}
        onTouchTap={this.onArticleListItemTouchTap} />
    ))
  }

  render() {
    const { topics } = this.props
    return (
      <div>
        <AppBar
          className="AppBar"
          title={<span>Articles</span>}
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
        <List dir={this.getDir(topics)}>
          {this.renderList(topics)}
        </List>
      </div>
    )
  }

  getDir(topics) {
    if (!topics) {
      return 'ltr'
    }
    const firstTopic = topics[0]
    return firstTopic.baseLang.startsWith('ar') || firstTopic.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  onBackButtonTouchTap = () => {
    this.props.history.push('/')
  }

  onSearchButtonTouchTap = () => {
    this.props.history.push(`/search`)
  }

  onArticleListItemTouchTap = (topic) => {
    this.props.history.push(`/content/${topic.publication}/${topic.chapter}`)
  }

}

function mapStateToProps(state) {
  return {
    topics: state.articleTopics,
    fetchArticleTopics: state.fetchArticleTopics
  }
}

export default connect(mapStateToProps, { fetchArticleTopics })(ArticleList)
