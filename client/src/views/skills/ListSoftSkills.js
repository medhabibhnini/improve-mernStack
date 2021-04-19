import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllSoft, dispatchGetAllSkills} from '../../redux/actions/softskillsAction'
import axios from 'axios'
import {Link} from 'react-router-dom'
import image from "./header.jpg";
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
      <div>
     <div style={mystyle} >
              </div>
              <div  class="contenant">
              <img src={image} class="img-fluid"  style={{marginLeft:'0%',height:'300px',width:'1140px',maxWidth:'100%'}}/>
              <div class="texte_centrer"> <h1 class="titles">Liste des skills</h1></div>
 
              
</div>
<div class="container-fluid">

  <div class="row">
    <div class="col-lg-9">
    {loading && <h3>Loading.....</h3>}
    <div class="table-responsive table--no-card m-b-30"  style={{marginLeft:'180px'}}>
      <table summary="This table shows how to create responsive tables using Datatables' extended functionality" class="table table-borderless table-striped table-earning">
        <thead>
          <tr>
            <th>Title</th>
            <th  class="text-right">Description</th>
            <th  class="text-right">Type</th>
            <th  class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          { skills.map(skill =>(
          <tr data-status="active"  key={skill._id}>
            <td>{skill.title}</td>
            <td>{skill.description}</td>
            <td>{skill.type}</td>
            <td>
            <Link  to={`/admin/editskills/${skill._id}`}>
                                                <i className="fas fa-edit" title="Edit" style={{height:'40px',width:'60px',marginLeft:'50px'}} > </i>
                                          
                                            </Link>
               <i className="fas fa-trash-alt" title="Remove" style={{height:'4px',width:'40px'}} 
                                    onClick={() => handleDelete(skill._id)}         ></i></td>
          </tr>
           ) )}
        </tbody> 
        <tfoot>
       
        </tfoot>
      </table>
      </div>
    </div>
  </div>
</div>
</div>
    )
}

export default ListSoftSkills
