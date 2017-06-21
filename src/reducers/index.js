import { combineReducers } from 'redux'
import PublicationTopicsReducer from './publicationTopicsReducer'
import ArticleTopicsReducer from './articleTopicsReducer'
import ArticleContentReducer from './articleContentReducer'
import AutoCompleteReducer from './autoCompleteReducer'

const rootReducer = combineReducers({
    publicationTopics: PublicationTopicsReducer,
    articleTopics: ArticleTopicsReducer,
    articleContent: ArticleContentReducer,
    autoCompleteItems: AutoCompleteReducer
})

export default rootReducer
