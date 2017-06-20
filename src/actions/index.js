import axios from 'axios'

export const FETCH_PUBLICATION_TOPICS = 'FETCH_PUBLICATION_TOPICS'
export const FETCH_ARTICLE_TOPICS = 'FETCH_ARTICLE_TOPICS'
export const FETCH_ARTICLE_CONTENT = 'FETCH_ARTICLE_CONTENT'

const API_URL = 'http://localhost:9000/api'
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE0OGFhNjU3MjU4OTE1MDA1YzQyMDMiLCJpYXQiOjE0OTc1MTk0MTMsImV4cCI6MTUwMDExMTQxM30.Iq9lW7gK0GgNuDhlIs5eKPEO13aGYrhlJnONDskbjx0'

function fetchData(route, key) {
  return axios({
    // method: 'get',
    url: API_URL + route,
    headers: {Authorization: 'Bearer ' + TOKEN}
  }).then(res => ({ [key]: res.data }))
}

export function fetchPublicationTopics() {
  return {
    type: FETCH_PUBLICATION_TOPICS,
    payload: fetchData('/topics/auth', 'index')
  }
}

export function fetchArticleTopics(publication) {
  return {
    type: FETCH_ARTICLE_TOPICS,
    payload: fetchData(`/topics/auth/${publication}`, publication)
  }
}

export function fetchArticleContent(publication, article) {
  const fileName = `${publication}.${article}.md`
  return {
    type: FETCH_ARTICLE_CONTENT,
    payload: fetchData(`/article/auth/${fileName}`, fileName)
  }
}
