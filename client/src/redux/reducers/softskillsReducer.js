import ACTIONS from '../actions/'

const skills =[]

const softskillsReducer = (state = skills, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_SKILLS :
            return action.payload
        default:
            return state
    }
}

export default softskillsReducer;