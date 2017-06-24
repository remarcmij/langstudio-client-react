import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { List } from 'material-ui/List'

import ArticleListItem from '../components/ArticleListItem'
import NetworkError from '../components/NetworkError'
import { fetch, fetchCancelled } from '../actions/articleList'
import * as selectors from '../selectors/articleList'

class ArticleList extends Component {

  static propTypes = {
    articles: PropTypes.object,
    publication: PropTypes.string,
    error: PropTypes.object,
    loading: PropTypes.bool,
    fetch: PropTypes.func,
    fetchCancelled: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
  }

  get articles() {
    const { articles } = this.props
    const { publication } = this.props.match.params
    return articles[publication]
  }

  componentDidMount() {
    if (!this.articles) {
      const { publication } = this.props.match.params
      this.props.fetch(publication)
    }
  }

  componentWillUnmount() {
    this.props.fetchCancelled()
  }

  renderList(articles) {
    const { error, publication } = this.props
    if (error) {
      return (
        <NetworkError error={error} retry={() => this.props.fetch(publication)} />
      )
    }
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
    const articles = this.articles
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
    const first = articles[0]
    return first.baseLang.startsWith('ar') || first.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
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
    articles: selectors.getArticles(state),
    publication: selectors.getPublication(state),
    loading: selectors.getLoading(state),
    error: selectors.getError(state)
  }
}

export default connect(mapStateToProps, {
  fetch,
  fetchCancelled
})(ArticleList)
