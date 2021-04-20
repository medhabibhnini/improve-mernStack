import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import image from "./header.jpg";
import axios from 'axios'
const initialState = {
    title: '',
    description:'',
    type:'',
    err: '',
    success: ''
}
export default function EditSoft  ()  {
    const {id} = useParams()
    const history = useHistory()
    const [data, setData] = useState(initialState)

    const [editSkills,setEditSkills]= useState([])
    const [skills,getSkills] =useState([]);
    
    const {title,description,type, err, success} = data

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    const getAllSkills =()=>{
        axios.get(`http://localhost:5000/soft/getsoft/${id}`)
        .then((response)=>{
        const allSkills =response.data;
        getSkills(allSkills)
      
        
        }).catch(error=>console.error(`Error :${error}`));
        
        
        }



    useEffect(()=>{
        getAllSkills() },[])
    const handleSubmit = async()=>{

        try{
const res = await axios.put(`http://localhost:5000/soft/updateSoft/${id}`,{
    title,type,description

})
setData({...data,err:'',success:res.data.msg})
}catch(err)
        {
            setData({...data, err: err.response.data.msg , success: ''})

        }
    }
   
    const handleUpdate =()=>{
if(title || description || type ) 
{handleSubmit()
    history.push("/admin/softskills")

}
    }
    const mystyle = {
   marginLeft:"60%"
      };
      const mystyle1 = {
        backgrounColor:"blue"
           };
    return (
      <div style={{
    width:'100%',
    height:'100%'
        
      }}>  
          <div style={mystyle} >
              </div>
              <img src={image} class="img-fluid"  style={{marginLeft:'12%',height:'auto',width:'1140px',maxWidth:'100%'}}/>

<div class="container" c >
  <h1 style={{marginLeft:'50%',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Edit soft skills </h1>
  <form onSubmit={handleUpdate}>
    <div class="row">
      <div class="col-25">
        <label for="fname"  style={{marginLeft:'10%',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title</label>
      </div>
      <div class="col-75">
        <input type="text"  id="fname" name="title" onChange={handleChange} placeholder="Communication.." defaultValue={skills.title}/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname"  style={{marginLeft:'10%',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Type</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="type"  onChange={handleChange} placeholder="type.." defaultValue={skills.type}/>
      </div>
    </div>
  
    <div class="row">
      <div class="col-25">
        <label for="subject"  style={{marginLeft:'10%',marginBottom:'10%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description</label>
      </div>
      <div class="col-75">
        <textarea id="subject" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}} defaultValue={skills.description}></textarea>
      </div>
    </div>
    <div class="row">
      <input type="submit" variant="primary" style={{marginLeft:'50%'}} value="Submit"/>
    </div>
  </form>
</div>
<footers/>
</div>  
    )
}

