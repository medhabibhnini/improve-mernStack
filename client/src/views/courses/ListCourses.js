import React,{useState, useEffect,useParams} from 'react'
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



useEffect(()=>{
getAllCourses();},[]);
const getAllCourses =()=>{
axios.get('http://localhost:5000/api/courses')
.then((response)=>{
const allCourses =response.data;
getCourses(allCourses);
}).catch(error=>console.error(`Error :${error}`));


}

const  nomsofts =()=>{
  axios.get(`http://localhost:5000/api/getnamesoftcourse/`)
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
    await axios.delete(`http://localhost:5000/api/courses/${id}`, {

  })
  setLoading(false)
  setCallback(!callback)
  window.location.reload(false);

  }
  


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
        
{/*
<div class="col">
          <div class="card shadow">
            <div class="card-header border-0" >
              <h3 class="mb-0">Card tables</h3>
              </div>
    
<Link to ="/create_course">
            <Button className=" " style={{marginTop:"30px", marginLeft:"1300px",width:"150px"}}>Add A Course +</Button>

            </Link >
           <table class="table align-items-center table-flush" style={{marginLeft:"200px",marginRight:"100px", maxWidth:"100%"}}>
                        <thead class="thead-light">
                        <tr>
            <th>Title</th>
            <th >Description</th>
            <th  >Category</th>
            <th  >Price</th>
            <th  >Link</th>
            <th >Actions</th>
          </tr>
                        </thead>
                        <tbody>
                        { courses.map(course =>(
          <tr   key={course._id}>
            <td>{course.title}</td>
            <td>{course.description}</td>
            <td>{course.nomsofts}</td>
            <td>{course.price}</td>
            <td>{course.link}</td>
            <td>
            <Link  to={`/edit_course/${course._id}`}>
                                                <Button className="fas fa-edit btn btn-warning" title="Edit" style={{height:'40px',width:'60px',marginLeft:'50px'}} > </Button>
                                          
                                            </Link>
               <Button className="fas fa-trash-alt  btn btn-danger"  title="Remove" style={{height:'40px',width:'60px'}} 
                                    onClick={() => handleDelete(course._id)}         ></Button></td>
          </tr>
           ) )}
                        </tbody>
                    </table>
             </div>
             </div>
    
  
    
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> 

                        */}
                        

<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Courses</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Courses</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Courses</h4>
              <Link to ="/addmicro">
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
											<h6 class="m-b10">{courses.title}</h6>
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
