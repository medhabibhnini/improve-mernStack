import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllEvent, dispatchGetAllEvents} from '../../redux/actions/eventsAction'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';


import Dashboard from "../../components/body/dashboard/dashboard"
import { Button } from 'react-bootstrap';

import { $CombinedState } from 'redux'
import { event } from 'jquery'
const initialState ={
  title :'',
  type :'',
  description :'',
  err: '',
  success: ''
  
  }
  
const ListEvents = () => {
const [events,getEvents] =useState([]);
const [loading, setLoading] = useState(false)
const [callback, setCallback] = useState(false)
const token = useSelector(state => state.token)
const [avatar, setAvatar] = useState(false)

const [data, setData] = useState(initialState)

useEffect(()=>{
getAllEvents();},[]);
const getAllEvents =()=>{
axios.get('/event/events')
.then((response)=>{
const allEvents =response.data;
getEvents(allEvents);
}).catch(error=>console.error(`Error :${error}`));


}

const changeAvatar = async(e) => {
  e.preventDefault()
  try {
      const file = e.target.files[0]

      if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

      if(file.size > 1024 * 1024)
          return setData({...data, err: "Size too large." , success: ''})

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
          return setData({...data, err: "File format is incorrect." , success: ''})

      let formData =  new FormData()
      formData.append('file', file)

      setLoading(false)
      const res = await axios.post('/api/upload_avatar', formData, {
          headers: {'content-type': 'multipart/form-data', Authorization: token}
      })

      setLoading(true)
      setAvatar(res.data.url)
      
  } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
  }
}
const updateInfor = () => {
  try {
      axios.patch('/event/events', {
          avatar: avatar ? avatar : events.avatar
      },{
          headers: {Authorization: token}
      })

      setData({...data, err: '' , success: "Updated Success!"})
  } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
  }
}
const handleDelete = async (id) =>{
try{
  if(window.confirm("Are you sure ? Do you want to delete this event"))
  {                  
      setLoading(true)
    await axios.delete(`/event/deleteevents/${id}`, {

  })
  setLoading(false)
  setCallback(!callback)
  window.location.reload(false);

  }
  


} catch (err) {
  setData({...data, err: err.response.data.msg , success: ''})
}


}
const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timeZoneName: 'long'
  };
const mystyle = {
  marginLeft:"60%"
     };
    return (
      <>
<Dashboard/>



<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Events</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Events</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>List Events </h4>
              <Link to ="/addevent">
            <Button className=" " style={{marginTop:"20px"}}>Add event + </Button>

            </Link >
						</div>
						<div class="widget-inner">
            { events.map(event =>(
							<div  key={event._id} class="card-courses-list admin-courses">
								<div class="card-courses-media">
									<img src={event.avatar} alt=""/>
								</div>
								
								<div class="card-courses-full-dec">
									<div class="card-courses-title">
										<h4>{event.title}</h4>
									
									</div>
									
									<div class="card-courses-list-bx">
										<ul class="card-courses-view">
											<li class="card-courses-user">
												<div class="card-courses-user-info">
												<Moment format="DD/MM/YYYY" >{event.date}</Moment><br></br>
												</div>
												</li>
												<div class="card-courses-user-info">
													<h4>{event.state}</h4>
													<h5>{event.link}</h5>
												</div>
											</ul>
											</div>
											

									<div class="row card-courses-dec">
									<div class="card-courses-list-bx">
									<ul class="card-courses-view">
									<li class="card-courses-user">

									   <div class="col-md-12">
													<h5 class="m-b10">{event.etatevent}</h5>
													
													<h6>{event.price} $</h6>
													</div>
													</li>
											</ul>
									</div>
										<div class="col-md-12">
											<h6 class="m-b10">{event.type}</h6>
											<p>{event.description} </p>	
										</div>

										<div class="col-md-12">
											<Link  to={`/editevent/${event._id}`} class="btn green radius-xl outline">Edit</Link>
											<Link  onClick={() => handleDelete(event._id)}  class="btn red outline radius-xl ">Delete</Link>
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
/************************************ */

    )
}

export default ListEvents
