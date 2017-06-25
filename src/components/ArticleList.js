import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import ChildAppBar from './ChildAppBar'
import ArticleListItem from './ArticleListItem'
import NetworkError from './NetworkError'

const noop = () => undefined

export default class ArticleList extends React.Component {

  static propTypes = {
    publication: PropTypes.string.isRequired,
    topics: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
    fetchArticleTopics: PropTypes.func.isRequired,
    fetchArticleTopicsCancelled: PropTypes.func.isRequired,
    onBackClick: PropTypes.func,
    onSearchClick: PropTypes.func,
    onItemClick: PropTypes.func
  }

  static defaultProps = {
    topics: null,
    loading: false,
    error: null,
    onBackClick: noop,
    onSearchClick: noop,
    onItemClick: noop
  }

  get topics() {
    const { topics, publication } = this.props
    return topics[publication]
  }

  componentDidMount() {
    if (!this.topics) {
      const { publication, fetchArticleTopics } = this.props
      fetchArticleTopics(publication)
    }
  }

  componentWillUnmount() {
    const { loading, fetchArticleTopicsCancelled } = this.props
    if (loading) {
      fetchArticleTopicsCancelled()
    }
  }

  renderList(topics) {
    const { error, fetchArticleTopics, onItemClick } = this.props
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
        onItemClick={() => onItemClick(topic)} />
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
    const { onBackClick, onSearchClick } = this.props
    return (
      <div>
        <ChildAppBar
          title={topics ? topics[0].title : null}
          onBackClick={onBackClick}
          onSearchClick={onSearchClick}
        />
        <List dir={this.getDir(topics)}>
          {this.renderList(topics)}
        </List>
      </div>
    )
  }
}
