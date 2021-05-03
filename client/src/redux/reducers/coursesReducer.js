import ACTIONS from '../actions/'

const courses =[]

const coursesReducer = (state = courses, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_SKILLS :
            return action.payload
        default:
            return state
    }
}

export default coursesReducer;