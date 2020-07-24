import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import recipePostReducer from './recipePostReducer'
import commentsReducer from './commentsReducer'
import paginationReducer from './paginationReducer'
import recipeListReducer from './recipeListReducer'
import isLogedInReducer from './isLogedInReducer'


export default combineReducers({
    homePosts: homeReducer, 
    recipePost: recipePostReducer,
    comments: commentsReducer,
    pagination: paginationReducer,
    recipeList: recipeListReducer,
    isLogedIn: isLogedInReducer
})