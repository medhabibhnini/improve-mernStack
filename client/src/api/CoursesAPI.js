import {useState, useEffect} from 'react'
import axios from 'axios'


function CoursesAPI() {
    const [courses, setCourses] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getCourses = async () => {
            const res = await axios.get(`/api/courses?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setCourses(res.data.courses)
            setResult(res.data.result)
        }
        getCourses()
    },[callback, category, sort, search, page])
    
    return {
        courses: [courses, setCourses],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default CoursesAPI
