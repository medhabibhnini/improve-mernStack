import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../GlobalState'
import Loading from '../../utils/loading/Loading'
import {useSelector, useDispatch} from 'react-redux'
import Select from 'react-Select';
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
    const state = useContext(GlobalState)
    const [course, setCourse] = useState(initialState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const options = ['Soft Skill', 'Hard Skill']
    const token = useSelector(state => state.token)


    const history = useHistory()
    const param = useParams()

    const [courses, setCourses] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            courses.forEach(course => {
                if(course._id === param.id) {
                    setCourse(course)
                    setImages(course.images)
                }
            })
        }else{
            setOnEdit(false)
            setCourse(initialState)
            setImages(false)
        }
    }, [param.id, courses])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
              //  headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
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
            //if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/courses/${course._id}`, {...course, images}, {
                //    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/courses', {...course, images}, {
                  //  headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_course">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
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

                <div style={{marginLeft:'40%', marginTop: '60px'}}>
    <label htmlFor="category">category</label>
      <select
        options={options}
        style={{ width: 300 }}
        renderInput={(params) =>
          <TextField {...params} label="Combo box" variant="outlined" />}
      />
    </div>


                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateCourse
