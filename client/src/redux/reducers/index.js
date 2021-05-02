import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import softskills from './softskillsReducer'
import posts from "./posts.reducer";
import blogs from "./blog.reducer"
export default combineReducers({
    auth,
    token,
    users,
    softskills,
    posts,
    blogs,
 
})