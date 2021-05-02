import ACTION from "./index"
import axios from 'axios'

export const fetchAllCourses = async () => {
    const res = await axios.get('http://localhost:5000/courses', {
      
    })
    return res
}

export const dispatchGetAllCourses = (res) => {
    return {
        type: ACTION.GET_ALL_SKILLS,
        payload: res.data
    }
}