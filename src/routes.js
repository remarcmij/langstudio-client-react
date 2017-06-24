import React from 'react'
import { Route } from 'react-router-dom'

import PublicationListContainer from './containers/PublicationListContainer'
import ArticleListContainer from './containers/ArticleListContainer'
import ArticleContainer from './containers/ArticleContainer'
import SearchPageContainer from './containers/SearchPageContainer'

export default (
  <div>
    <Route exact path="/" component={PublicationListContainer} />
    <Route exact path="/content/:publication" component={ArticleListContainer} />
    <Route path="/content/:publication/:chapter" component={ArticleContainer} />
    <Route path="/search" component={SearchPageContainer} />
  </div>
)
