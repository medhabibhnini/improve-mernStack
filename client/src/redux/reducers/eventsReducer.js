import ACTIONS from '../actions/'

const events =[]

const eventsReducer = (state = events, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_EVENTS :
            return action.payload
        default:
            return state
    }
}

export default eventsReducer;