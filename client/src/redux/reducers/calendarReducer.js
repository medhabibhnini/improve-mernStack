import ACTIONS from '../actions/'

const calendar =[]

const calendarReducer = (state = calendar, action) => {
    switch(action.type){
        case ACTIONS.GET_CALENDAR :
            return action.payload
        default:
            return state
    }
}

export default calendarReducer;