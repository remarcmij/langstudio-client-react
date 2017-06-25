import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import ChildAppBar from './ChildAppBar'
import ArticleListItem from './ArticleListItem'
import NetworkError from './NetworkError'

export default class ArticleList extends React.Component {

  static propTypes = {
    topics: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchArticleTopics: PropTypes.func.isRequired,
    fetchArticleTopicsCancelled: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static defaultProps = {
    topics: null,
    loading: false,
    error: null
  }

  constructor(props) {
    super(props)
    this.onBackClick = this.onBackClick.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
  }

  get topics() {
    const { topics } = this.props
    const { publication } = this.props.match.params
    return topics[publication]
  }

  componentDidMount() {
    if (!this.topics) {
      const { publication } = this.props.match.params
      this.props.fetchArticleTopics(publication)
    }
  }

  componentWillUnmount() {
    const { loading, fetchArticleTopicsCancelled } = this.props
    if (loading) {
      fetchArticleTopicsCancelled()
    }
  }

  onBackClick() {
    this.props.history.push('/')
  }

  onSearchClick() {
    this.props.history.push(`/search`)
  }

  onItemClick(topic) {
    this.props.history.push(`/content/${topic.publication}/${topic.chapter}`)
  }

  renderList(topics) {
    const { error, fetchArticleTopics } = this.props
    if (error) {
      return (
        <NetworkError error={error} onRetryClick={fetchArticleTopics} />
      )
    }
    if (!topics) {
      return null
    }
    return topics.slice(1).map(topic => (
      <ArticleListItem
        key={topic._id}
        topic={topic}
        onItemClick={() => this.onItemClick(topic)} />
    ))
  }

  getDir(topics) {
    if (!topics) {
      return 'ltr'
    }
    const index = topics[0]
    return index.baseLang.startsWith('ar') || index.targetLang.startsWith('ar') ? 'rtl' : 'ltr'
  }

  render() {
    const topics = this.topics
    return (
      <div>
        <ChildAppBar
          title={topics ? topics[0].title : null}
          onBackClick={this.onBackClick}
          onSearchClick={this.onSearchClick}
        />
        <List dir={this.getDir(topics)}>
          {this.renderList(topics)}
        </List>
      </div>
    )
  }
}
