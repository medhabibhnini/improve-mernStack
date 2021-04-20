import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
//import {GlobalState} from '../../GlobalState'
import Loading from '../../utils/loading/Loading'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "../body/dashboard/SubMenu"
import {Link} from 'react-router-dom'

import "../body/dashboard/styledash.css"
import {  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media ,Nav,NavItem, NavLink } from  "reactstrap";




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
    const {user, isLogged, isAdmin} = auth

    //const state = useContext(GlobalState)
    const [course, setCourse] = useState(initialState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const options = ['Soft Skill', 'Hard Skill']
    const token = useSelector(state => state.token)

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }
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
            
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
  <a class="navbar-brand" href="#">Sidebar Nav</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarCollapse"
    aria-controls="navbarCollapse"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="navbar-nav mr-auto sidenav" id="navAccordion">
    <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink tag={Link} to={"/about"}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            About
          </NavLink>
        </NavItem>
  <NavItem>
        <NavLink tag={Link} to={"/create_course"}>
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            Courses
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to={"/pages"}>
            Portfolio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/faq"}>
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/contact"}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </ul>
    <ul class="navbar-nav ml-auto mt-2 mt-md-0">
    <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
               src=
               {user.avatar}
                
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
              {user.name}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem to="/profile" tag={Link}>
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile" tag={Link}>
            <i className="ni ni-settings-gear-65" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile" tag={Link}>
            <i className="ni ni-calendar-grid-58" />
            <span>Activity</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile" tag={Link}>
            <i className="ni ni-support-16" />
            <span>Support</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem to="/" onClick={handleLogout}>
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </ul>
  </div>
</nav>

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
                    <label htmlFor="title">link</label>
                    <input type="text" name="link" id="link" required
                    value={course.link} onChange={handleChangeInput} />
                </div>

                <div className="row">
                <label htmlFor="category" >category</label>
                
                <select name="category" id="category" required 
                value= {course.category} onChange={handleChangeInput}>
                <option>Soft Skill</option>
                <option>Hard Skill</option>

                </select>
                
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
    
      
    </div>


                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateCourse
