export const FETCH_PUBLICATIONS = 'FETCH_PUBLICATIONS'
export const FETCH_PUBLICATIONS_FULFILLED = 'FETCH_PUBLICATIONS_FULFILLED'
export const FETCH_PUBLICATIONS_CANCELLED = 'FETCH_PUBLICATIONS_CANCELLED'

export const FETCH_ARTICLES = 'FETCH_ARTICLES'
export const FETCH_ARTICLES_FULFILLED = 'FETCH_ARTICLES_FULFILLED'
export const FETCH_ARTICLES_CANCELLED = 'FETCH_ARTICLES_CANCELLED'

export const FETCH_ARTICLE_CONTENT = 'FETCH_ARTICLE_CONTENT'
export const FETCH_ARTICLE_CONTENT_FULFILLED = 'FETCH_ARTICLE_CONTENT_FULFILLED'
export const FETCH_ARTICLE_CONTENT_CANCELLED = 'FETCH_ARTICLE_CONTENT_CANCELLED'

export const FETCH_AUTOCOMPLETE = 'FETCH_AUTOCOMPLETE'
export const FETCH_AUTOCOMPLETE_FULFILLED = 'FETCH_AUTOCOMPLETE_FULFILLED'

export const fetchPublications = () => ({ type: FETCH_PUBLICATIONS })
export const fetchPublicationsCancelled = () => ({ type: FETCH_PUBLICATIONS_CANCELLED })

export const fetchArticles = (publication) => ({ type: FETCH_ARTICLES, payload: { publication } })
export const fetchArticlesCancelled = () => ({ type: FETCH_ARTICLES_CANCELLED })

export const fetchArticleContent = (publication, chapter) => ({ type: FETCH_ARTICLE_CONTENT, payload: { publication, chapter } })
export const fetchArticleContentCancelled = () => ({ type: FETCH_ARTICLE_CONTENT_CANCELLED })

export const fetchAutoCompleteItems = term => ({ type: FETCH_AUTOCOMPLETE, payload: term })
