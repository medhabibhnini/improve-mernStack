import React,{useState, useEffect,useParams} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllCourses, dispatchGetAllCourses} from '../../redux/actions/coursesAction'
import axios from 'axios'
import {Link} from 'react-router-dom'
import image from "./courses.jpg";


import Dashboard from "../../components/body/dashboard/dashboard"
import { Button } from 'react-bootstrap';


import { $CombinedState } from 'redux'
const initialState ={
  title :'',
  description :'',
  category:'',
  price:'',
  link:'',
  err: '',
  success: ''
  
  }


const ListCourses = () => {
const [courses,getCourses] =useState([]);
const [loading, setLoading] = useState(false)
const [callback, setCallback] = useState(false)
const [data, setData] = useState(initialState)
const [nomsoft,getnomsoft]=useState([])

const history = useHistory()

useEffect(()=>{
getAllCourses();},[]);
const getAllCourses =()=>{
axios.get('/api/courses')
.then((response)=>{
const allCourses =response.data;
getCourses(allCourses);
}).catch(error=>console.error(`Error :${error}`));


}

const  nomsofts =()=>{
  axios.get(`/api/getnamesoftcourse/`)
        .then((response)=>{
        const allSkills =response.data;
        
        getnomsoft(allSkills);
  
  
      }).catch(error=>console.error(`Error :${error}`));
  
  }
const handleDelete = async (id) =>{
try{
  if(window.confirm("Are you sure ? Do you want to delete this course? "))
  {                  
      setLoading(true)
    await axios.delete(`/api/courses/${id}`, {

  })
  setLoading(false)
  setCallback(!callback)
 

  }
  
  history.push("/courses");

} catch (err) {
  setData({...data, err: err.response.data.msg , success: ''})
}


}
const mystyle = {
  marginLeft:"60%"
     };
    return (
      <>
        <Dashboard/>
   
                        

<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Our Online Courses</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Courses</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Best Courses</h4>
              <h5>Learn Courses</h5>
              <Link to ="/create_course">
            <Button className=" " style={{marginTop:"20px"}}>Add Courses + </Button>

            </Link >
						</div>
						<div class="widget-inner">
            { courses.map(courses =>(
							<div  key={courses._id} class="card-courses-list admin-courses">
								<div class="card-courses-media">
									<img src={courses.image} alt=""/>
								</div>
								<div class="card-courses-full-dec">
									
									<div class="card-courses-list-bx">
										<ul class="card-courses-view">
											<li class="card-courses-user">
												<div class="card-courses-user-pic">
												</div>
												<div class="card-courses-user-info">
										
												</div>
											</li>
											<li class="card-courses-categories">
											
											</li>
								
										
										</ul>
									</div>
									<div class="row card-courses-dec">
										<div class="col-md-12">
											<h6 class="m-b10">Course Description</h6>
											<p>{courses.description} </p>	
										</div>
										<div class="col-md-12">
											<Link  to={`/edit_course/${courses._id}`} class="btn green radius-xl outline">Edit</Link>
											<Link  onClick={() => handleDelete(courses._id)}  class="btn red outline radius-xl ">Delete</Link>
										</div>
									</div>
									
								</div>
							</div>
						
             ) )}
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
	<div class="ttr-overlay"></div>


</>

    )
}

export default ListCourses
