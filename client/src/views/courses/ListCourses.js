import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllCourses, dispatchGetAllCourses} from '../../redux/actions/coursesAction'
import axios from 'axios'
import {Link} from 'react-router-dom'
import image from "./courses.jpg";
import "../../components/body/home/home.css"

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

useEffect(()=>{
getAllCourses();},[]);
const getAllCourses =()=>{
axios.get('http://localhost:5000/api/courses')
.then((response)=>{
const allCourses =response.data;
getCourses(allCourses);
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
      
<div class="col">
          <div class="card shadow">
            <div class="card-header border-0" >
              <h3 class="mb-0">Card tables</h3>
              </div>
              <div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://blogs.flinders.edu.au/fit/wp-content/uploads/sites/19/2018/10/short-courses.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"450px",fontSize:"100",color:"white"}}> Courses Management </h1>
<div class="overlay"></div>
</div>
<Link to ="/create_course">
            <Button className=" " style={{marginTop:"30px", marginLeft:"1300px",width:"150px"}}>Add A Course +</Button>

            </Link >
           <table class="table align-items-center table-flush" style={{marginLeft:"200px",marginRight:"100px"}}>
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
            <td>{course.category}</td>
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
</>
/************************************ */

    )
}

export default ListCourses
