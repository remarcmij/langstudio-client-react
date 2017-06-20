import { combineReducers } from 'redux'
import PublicationTopicsReducer from './publicationTopicsReducer'
import ArticleTopicsReducer from './articleTopicsReducer'
import ArticleContentReducer from './articleContentReducer'

const rootReducer = combineReducers({
    publicationTopics: PublicationTopicsReducer,
    articleTopics: ArticleTopicsReducer,
    articleContent: ArticleContentReducer
})

export default rootReducer
