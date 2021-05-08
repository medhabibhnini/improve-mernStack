import ACTION from "./index"
import axios from 'axios'

export const fetchAllEvent = async (token) => {
    const res = await axios.get('http://localhost:5000/event/events', {
        Body: {Authorization: token}

    })
    return res
}

export const dispatchGetAllEvents = (res) => {
    return {
        type: ACTION.GET_ALL_EVENTS,
        payload: res.data
    }
}