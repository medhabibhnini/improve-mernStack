import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllSoft, dispatchGetAllSkills} from '../../redux/actions/softskillsAction'
import axios from 'axios'
import {Link} from 'react-router-dom'
import image from "./header.jpg";
import Swal from 'sweetalert2'

import Dashboard from "../../components/body/dashboard/dashboard"
import { Button } from 'react-bootstrap';

import { $CombinedState } from 'redux'
const initialState ={
  title :'',
  type :'',
  description :'',
  err: '',
  success: ''
  
  }
  
const ListSoftSkills = () => {
const [skills,getSkills] =useState([]);
const [loading, setLoading] = useState(false)
const [callback, setCallback] = useState(false)
const [data, setData] = useState(initialState)

useEffect(()=>{
getAllSkills();},[]);

const getAllSkills =()=>{
axios.get('http://localhost:5000/soft/softskills')
.then((response)=>{
const allSkills =response.data;
getSkills(allSkills);
}).catch(error=>console.error(`Error :${error}`));


}
const handleDelete = async (id) =>{
try{
  if(window.confirm("Are you sure ? Do you want to delete this soft skills"))
  {                  
      setLoading(true)
    await axios.delete(`http://localhost:5000/soft/deleteskills/${id}`, {

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
              <div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.amalo-recrutement.fr/app/uploads/2020/01/soft-skills-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"450px",fontSize:"100",color:"white"}}> Soft skills management </h1>
<div class="overlay"></div>
</div>
<Link to ="/addsoft">
            <Button className=" " style={{marginTop:"30px", marginLeft:"1300px",width:"150px"}}>Add soft skills +</Button>

            </Link >
           <table class="table align-items-center table-flush" style={{marginLeft:"200px",marginRight:"100px"}}>
                        <thead class="thead-light">
                        <tr>
            <th>Title</th>
            <th >Description</th>
            <th  >Type</th>
            <th >Actions</th>
          </tr>
                        </thead>
                        <tbody>
                        { skills.map(skill =>(
          <tr   key={skill._id}>
            <td>{skill.title}</td>
            <td>{skill.description}</td>
            <td>{skill.type}</td>
            <td>
            <Link  to={`/editsoft/${skill._id}`}>
                                                <Button className="fas fa-edit btn btn-warning" title="Edit" style={{height:'40px',width:'60px',marginLeft:'50px'}} > </Button>
                                          
                                            </Link>
               <Button className="fas fa-trash-alt  btn btn-danger"  title="Remove" style={{height:'40px',width:'60px'}} 
                                    onClick={() => handleDelete(skill._id)}         ></Button></td>
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

export default ListSoftSkills
