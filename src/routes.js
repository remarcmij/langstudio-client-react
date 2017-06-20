import React from 'react'
import { Route } from 'react-router-dom'

import PublicationList from './containers/PublicationList'
// import ArticleList from './containers/ArticleList'
// import Article from './containers/Article'

export default (
  <div>
    <Route exact path="/" component={PublicationList} />
    {/*<Route exact path="/articles/:publication" component={ArticleList} />
    <Route path="/articles/:publication/:article" component={Article} />*/}
  </div>
)
