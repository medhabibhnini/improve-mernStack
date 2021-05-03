import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

const initialState = {
    title: '',
    description:'',
    type:'',
    avatar :'',
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
    
    const {title,description,type, err, success} = data

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
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
    title,type,description,avatar

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
if(title || description || type || avatar ) 
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

      <div style={{
    width:'100%',
    height:'100%'
        
      }}>  
          <div style={mystyle} >
              </div>

<div class="container"  style={{marginLeft:"300px",marginTop:"100px"}} >
<div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.lymehaus.com/wp-content/uploads/2020/05/eventsturkeyantalya.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}> Edit events </h1>
<div class="overlay"></div>
</div>  
<form onSubmit={handleUpdate}>
    <div class="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title</label>    
        <input type="text" class="form-control"  id="fname" name="title" onChange={handleChange} placeholder="Communication.." defaultValue={events.title}/>
     
    </div>
    <div class="form-group">
        <label for="lname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Type</label>
        <select class="form-control" id="lname" name="type"  onChange={handleChange} placeholder="type.." defaultValue={events.type}>
        <option value="TEDx talks">TEDx talks</option>
      <option value="Club mashups">Club mashups</option>
      <option value="Local city tours">Local city tours</option>
      <option value="Workshops">Workshops</option>
      <option value="Academic awards">Academic awards</option>
      <option value="Meet the grads">Meet the grads</option>
      <option value="Retreats and other stress-relief activities">Retreats and other stress-relief activities</option>
      </select>
    </div>
  
    <div class="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description</label>
        <textarea id="subject" name="description" class="form-control" onChange={handleChange} placeholder="Write something.." style={{height:200}} defaultValue={events.description}></textarea>
    </div>
    <div class="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>image</label>
        <input type="file" class="form-control" id="file_up" name="file" defaultValue={events.avatar} onChange={handleUpload} />
    </div>

    <div class="row">
      <input type="submit" className="btn btn-primary" variant="primary" style={{marginLeft:'50%'}} value="Submit"/>
    </div>
  </form>
</div>
<footers/>
</div>  
</>
    )
}

