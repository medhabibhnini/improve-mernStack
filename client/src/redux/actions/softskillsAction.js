import ACTION from "./index"
import axios from 'axios'

export const fetchAllSoft = async () => {
    const res = await axios.get('http://localhost:5000/soft/softskills', {
      
    })
    return res
}

export const dispatchGetAllSkills = (res) => {
    return {
        type: ACTION.GET_ALL_SKILLS,
        payload: res.data
    }
}