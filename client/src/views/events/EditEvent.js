import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { CustomInput, FormGroup } from 'reactstrap';
import Loading from '../../utils/loading/Loading'

import Dashboard from "../../components/body/dashboard/dashboard"
import { event } from 'jquery'
import Events from './Events'

const initialState = {
   title: '',
   type: '',
   state: 'online',
   localisation: 'null',
   link: 'null',
   date: '',
    etatevent:'',
    price:'',
    err: '',
    success: ''
}
export default function EditEvent  ()  {
    const {id} = useParams()
    const history = useHistory()
    const [data, setData] = useState(initialState)
    const [avatar, setAvatar] = useState(false)
    const token = useSelector(state => state.token)
    const [loading, setLoading] = useState(false)

    const [editEvents,setEditEvents]= useState([])
    const [events,getEvents] =useState([]);
    
    const { title, type, description, state, localisation, link, date, etatevent, price, err, success} = data

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    const styleUpload = {
        display: avatar ? "block" : "none"
    }   
    
    const getAllEvents =()=>{
        axios.get(`http://localhost:5000/event/getevent/${id}`)
        .then((response)=>{
        const allEvents =response.data;
        getEvents(allEvents)
      
        
        }).catch(error=>console.error(`Error :${error}`));
        
        
        }



    useEffect(()=>{
        getAllEvents() },[])
    const handleSubmit = async()=>{

        try{
const res = await axios.put(`http://localhost:5000/event/updateEvent/${id}`,{
    title, type, description, state, localisation, link, date, etatevent, price, avatar
})
setData({...data,err:'',success:res.data.msg})
history.push("/events")

setData({...data,err:'',success:res.data.msg})
}catch(err)
        {
            setData({...data, err: err.response.data.msg , success: ''})

        }
    }
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
            setAvatar(res.data.url)
  
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
   
    const handleUpdate =()=>{
if(title || description || type || state || date || etatevent || price || avatar) 
{handleSubmit()

}
    }
    const mystyle = {
   marginLeft:"60%"
      };
      const mystyle1 = {
        backgrounColor:"blue"
           };
    return (
      <>
          <Dashboard/>

          <main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Add Hard</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Edit Events</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Edit Events</h4>
						</div>
						<div class="widget-inner">
<form onSubmit={handleUpdate} class="edit-profile m-b30">
<div class="form-group">
        <label for="Tname" >Title</label>
        <input type="text" id="Tname"    style={{marginLeft:"45px",marginBottom:"25px"}}class="form-control" name="title" onChange={handleChange}  defaultValue={events.title}/>
    </div>
    <div class="form-group">
        <label for="type">Type</label>
        <select id="type" class="form-control" name="type" style={{marginLeft:"45px",marginBottom:"25px"}} onChange={handleChange} name="type" defaultValue={events.type}>
              <option value="TEDx talks">TEDx talks</option>
              <option value="Club mashups">Club mashups</option>
              <option value="Local city tours">Local city tours</option>
              <option value="Workshops">Workshops</option>
              <option value="Academic awards">Academic awards</option>
              <option value="Meet the grads">Meet the grads</option>
              <option value="Retreats and other stress-relief activities">Retreats and other stress-relief activities</option>
            </select>
      </div>
  
      <div class="form-group" defaultValue={events.state}>
        <label for="state" >State</label>
      <input 
          type="radio" style={{marginLeft: '20px'}}
          name="state"
          value="online"
          onChange={handleChange}
          checked={data.state==='online'}
          style={{marginLeft:"45px",marginBottom:"25px"}}
          />
          <span style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Online</span>
            
          <input 
          type="radio" style={{marginLeft: '10px'}}
          name="state"
          value="presential"
          onChange={handleChange}
          checked={data.state==='presential'}
          />
          <span style={{ marginLeft: '15px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Presential</span><br/>
    <br></br>
    <br></br>
    </div>
    <div class="form-group">
            <label htmlFor="fname" style={{marginLeft:"45px",marginBottom:"25px"}} >Link</label>
            <input type="text" id="link" style={{marginLeft:"45px",marginBottom:"25px"}} class="form-control" name="link" onChange={handleChange} placeholder="Link.." defaultValue={events.link} disabled={data.state==='presential' } /><br/>
    </div>
    <div class="form-group">
            <label htmlFor="fname" style={{marginLeft:"45px",marginBottom:"25px"}}>Localisation</label>
            <input type="text" id="localisation" class="form-control" style={{marginLeft:"45px",marginBottom:"25px"}} name="localisation" onChange={handleChange} placeholder="Localisation.."  defaultValue={events.localisation} disabled={data.state==='online' } /><br/>
     </div>

     <form>
    <label for="date">Enter a date and time for the event:</label>
    <input id="date" type="datetime-local" name="date" onChange={handleChange} defaultValue={events.date}/>
</form>

<div class="form-group" defaultValue={events.etatevent}>
        <label htmlFor="etatevent" id="etatevent" name="etatevent" >Free/Paying event :</label>
        <input 
          id="paying"
          type="radio"
          name="etatevent"
          value="paying"
          onChange={handleChange}
          style={{marginLeft:"45px",marginBottom:"25px"}}
          />
          <span id ="paying" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Paying</span>
          
          <input 
          id="free"
          type="radio" style={{marginLeft: '10px'}}
          name="etatevent"
          value="free"
          onClick={() =>data.price==="0"}
          onChange={handleChange}
          />
          
          <span id="free" style={{ marginLeft: '15px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Free</span><br/>
           </div>
           <br></br>
           <div class="form-group">
            <label htmlFor="fname"style={{marginLeft:"45px",marginBottom:"25px"}} >Price </label>
            <input type="text" id="price" class="form-control" style={{marginLeft:"45px",marginBottom:"25px"}} name="price" onChange={handleChange} placeholder="Price.." defaultValue={events.price} disabled={data.etatevent==='free'} /><br/>
          </div>
    

    <div class="form-group">
        <label for="description">Description </label>
        <br></br>
        <textarea id="description"  style={{marginLeft:"50px"}}  class="form-control" name="description"  onChange={handleChange} defaultValue={events.description} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div className="form-group">
      <div className="upload">
      

      <CustomInput  type="file" name="file" id="file_up" onChange={handleUpload} defaultValue={events.avatar}/>
     {
       loading ? <div id="file_img"><Loading /></div>
         :<div id="file_img" style={styleUpload}>
          <img src={avatar ? avatar.url : ''} alt=""/>
           </div>
        }
                
            </div>

</div>
<div class="row">
      <input type="submit" className="btn btn-primary" value="Confirm" style={{marginLeft:"500px"}}/>
    </div>
  </form>
</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</>
    )
}

