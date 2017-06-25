import React from 'react'
import { Route } from 'react-router-dom'

import PublicationList from './containers/PublicationList'
import ArticleList from './containers/ArticleList'
import Article from './containers/Article'
import Search from './containers/Search'

export default (
  <div>
    <Route exact path="/" component={PublicationList} />
    <Route exact path="/content/:publication" component={ArticleList} />
    <Route path="/content/:publication/:chapter" component={Article} />
    <Route path="/search" component={Search} />
  </div>
)
