import { Observable } from 'rxjs/Observable'

import config from '../config/config'
import {
  FETCH_ARTICLE_CONTENT,
  FETCH_ARTICLE_CONTENT_FULFILLED,
  FETCH_ARTICLE_CONTENT_CANCELLED
} from '../actions'

export default (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE_CONTENT_FULFILLED:
      return payload
    case FETCH_ARTICLE_CONTENT_CANCELLED:
      return null
    default:
      return state
  }
}

// const fetchArticleContentFulfilled = payload => ({ type: FETCH_ARTICLE_CONTENT_FULFILLED, payload })

export const fetchArticleContentEpic = action$ =>
  action$.ofType(FETCH_ARTICLE_CONTENT)
    .switchMap(action => {
      const { publication, chapter } = action.payload
      const fileName = `${publication}.${chapter}.md`
      const url = `${config.apiEndPoint}/article/${fileName}/?auth=${config.token}`
      return Observable.ajax(url)
        .map(res => ({ type: FETCH_ARTICLE_CONTENT_FULFILLED, payload: res.response }))
        .takeUntil(action$.ofType(FETCH_ARTICLE_CONTENT_CANCELLED))
    })
