import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import ArticleListItem from '../components/ArticleListItem'
import { fetchArticles, fetchArticlesCancelled } from '../actions'

class ArticleList extends Component {

  static propTypes = {
    articles: PropTypes.object,
    fetchArticles: PropTypes.func,
    fetchArticlesCancelled: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount() {
    const { publication } = this.props.match.params
    const articles = this.props.articles[publication]
    if (!articles) {
      this.props.fetchArticles(publication)
    }
  }

  componentWillUnmount() {
    this.props.fetchArticlesCancelled()
  }

  renderList(articles) {
    if (!articles) {
      return null
    }
    return articles.slice(1).map(article => (
      <ArticleListItem
        key={article._id}
        article={article}
        onTouchTap={this.onArticleListItemTouchTap} />
    ))
  }

  render() {
    const { publication } = this.props.match.params
    const articles = this.props.articles[publication]
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
        <List dir={this.getDir(articles)}>
          {this.renderList(articles)}
        </List>
      </div>
    )
  }

  getDir(articles) {
    if (!articles) {
      return 'ltr'
    }
    const firstTopic = articles[0]
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

function mapStateToProps({ articles }) {
  return { articles }
}

export default connect(mapStateToProps, {
  fetchArticles,
  fetchArticlesCancelled
})(ArticleList)
