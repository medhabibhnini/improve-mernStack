import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import softskills from './softskillsReducer'
import events from './eventsReducer'

export default combineReducers({
    auth,
    token,
    users,
    softskills,
    events,
})