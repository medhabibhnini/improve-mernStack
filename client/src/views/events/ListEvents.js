import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllEvent, dispatchGetAllEvents} from '../../redux/actions/eventsAction'
import axios from 'axios'
import {Link} from 'react-router-dom'
import "../../components/body/home/home.css"

import Dashboard from "../../components/body/dashboard/dashboard"
import { Button } from 'react-bootstrap';

import { $CombinedState } from 'redux'
const initialState ={
  title :'',
  type :'',
  description :'',
  avatar : '',
  err: '',
  success: ''
  
  }
  
const ListEvents = () => {
const [events,getEvents] =useState([]);
const [loading, setLoading] = useState(false)
const [callback, setCallback] = useState(false)

const [data, setData] = useState(initialState)

useEffect(()=>{
getAllEvents();},[]);
const getAllEvents =()=>{
axios.get('http://localhost:5000/event/events')
.then((response)=>{
const allEvents =response.data;
getEvents(allEvents);
}).catch(error=>console.error(`Error :${error}`));


}
const handleDelete = async (id) =>{
try{
  if(window.confirm("Are you sure ? Do you want to delete this event"))
  {                  
      setLoading(true)
    await axios.delete(`http://localhost:5000/event/deleteevent/${id}`, {

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
              <div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.lymehaus.com/wp-content/uploads/2020/05/eventsturkeyantalya.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"450px",fontSize:"100",color:"white"}}> Events management </h1>
<div class="overlay"></div>
</div>
<Link to ="/addevent">
            <Button className=" " style={{marginTop:"30px", marginLeft:"1300px",width:"150px"}}>Add Event +</Button>

            </Link >
           <table class="table align-items-center table-flush" style={{marginLeft:"200px",marginRight:"100px"}}>
                        <thead class="thead-light">
                        <tr>
            <th>Title</th>
            <th >Description</th>
            <th  >Type</th>
            <th>Photos </th>
            <th >Actions</th>
          </tr>
                        </thead>
                        <tbody>
                        { events.map(event =>(
          <tr   key={event._id}>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>{event.type}</td>
            <td>{event.avatar}</td>
            <td>
            <Link  to={`/editevent/${event._id}`}>
                                                <Button className="fas fa-edit btn btn-warning" title="Edit" style={{height:'40px',width:'60px',marginLeft:'50px'}} > </Button>
                                          
                                            </Link>
               <Button className="fas fa-trash-alt  btn btn-danger"  title="Remove" style={{height:'40px',width:'60px'}} 
                                    onClick={() => handleDelete(event._id)}         ></Button></td>
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

export default ListEvents
