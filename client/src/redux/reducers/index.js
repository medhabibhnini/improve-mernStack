import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import softskills from './softskillsReducer'
import courses from './coursesReducer'
export default combineReducers({
    auth,
    token,
    users,
    softskills,
    courses
})