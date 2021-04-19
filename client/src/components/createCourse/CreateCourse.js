import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'

import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    course_id: '',
    title: '',
    price: 0,
    description: 'How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.',
    link: '',
    category: '',
    _id: ''
}

function CreateCourse() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const [course, setCourse] = useState(initialState)
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const param = useParams();

    const [courses] = useSelector(state=> state.courses)
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            courses.forEach(course => {
                if(course._id === param.id) {
                    setCourse(course)
                    setImage(course.image)
                }
            })
        }else{
            setOnEdit(false)
            setCourse(initialState)
            setImage(false)
        }
    }, [param.id, courses])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImage(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: image.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImage(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setCourse({...course, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!image) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/courses/${course._id}`, {...course, image}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/courses', {...course, image}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: image ? "block" : "none"
    }
    return (
        <div className="create_course">
            <div className="upload">
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="course_id">Course ID</label>
                    <input type="text" name="course_id" id="course_id" required
                    value={course.course_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={course.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={course.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={course.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={course.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={course.category} onChange={handleChangeInput} >
                        
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateCourse
