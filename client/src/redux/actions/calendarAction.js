import ACTION from "./index"
import axios from 'axios'

export const fetchCalendar = async () => {
    const res = await axios.get('http://localhost:5000/event/events', {
      
    })
    return res
}

export const dispatchCalendars = (res) => {
    return {
        type: ACTION.GET_CALENDAR,
        payload: res.data
    }
}