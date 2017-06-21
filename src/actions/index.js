import axios from 'axios'
import LRU from 'lru-cache'
import config from '../config/config'

export const FETCH_PUBLICATION_TOPICS = 'FETCH_PUBLICATION_TOPICS'
export const FETCH_ARTICLE_TOPICS = 'FETCH_ARTICLE_TOPICS'
export const FETCH_ARTICLE_CONTENT = 'FETCH_ARTICLE_CONTENT'
export const FETCH_AUTOCOMPLETE_ITEMS = 'FETCH_AUTOCOMPLETE_ITEMS'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE0OGFhNjU3MjU4OTE1MDA1YzQyMDMiLCJpYXQiOjE0OTc1MTk0MTMsImV4cCI6MTUwMDExMTQxM30.Iq9lW7gK0GgNuDhlIs5eKPEO13aGYrhlJnONDskbjx0'

const httpCache = LRU({ max: 100, maxAge: 1000 * 60 * 60 })

function fetchData(route) {
  const url = config.apiEndPoint + route
  const data = httpCache.get(url)
  if (data) {
    return Promise.resolve(data)
  }
  return axios({
    url,
    headers: { Authorization: 'Bearer ' + TOKEN }
  }).then(res => {
    const data = res.data
    httpCache.set(url, data)
    return data
  })
}

export function fetchPublicationTopics() {
  return {
    type: FETCH_PUBLICATION_TOPICS,
    payload: fetchData('/topics/auth')
  }
}

export function fetchArticleTopics(publication) {
  return {
    type: FETCH_ARTICLE_TOPICS,
    payload: fetchData(`/topics/auth/${publication}`)
  }
}

export function fetchArticleContent(publication, chapter) {
  const fileName = `${publication}.${chapter}.md`
  return {
    type: FETCH_ARTICLE_CONTENT,
    payload: fetchData(`/article/auth/${fileName}`)
  }
}

export function fetchAutoCompleteItems(term) {
  return {
    type: FETCH_AUTOCOMPLETE_ITEMS,
    payload: fetchData(`/search/autocomplete?term=${term}`)
  }

}
