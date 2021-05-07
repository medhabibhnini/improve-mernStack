import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import image from "./softi.jpg";
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

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
        axios.get(`/soft/getsoft/${id}`)
        .then((response)=>{
        const allSkills =response.data;
        getSkills(allSkills)
      
        
        }).catch(error=>console.error(`Error :${error}`));
        
        
        }



    useEffect(()=>{
        getAllSkills() },[])
    const handleSubmit = async()=>{

        try{
const res = await axios.put(`/soft/updateSoft/${id}`,{
    title,type,description

})

setData({...data,err:'',success:res.data.msg})
history.push("/softskills")

}catch(err)
        {
            setData({...data, err: err.response.data.msg , success: ''})

        }
    }
   
    const handleUpdate =()=>{
if(title || description || type ) 
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
<div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.amalo-recrutement.fr/app/uploads/2020/01/soft-skills-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}> Edit soft skills </h1>
<div class="overlay"></div>
</div>  <form onSubmit={handleUpdate}>
    <div class="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title</label>
     
        <input type="text" class="form-control"  id="fname" name="title" onChange={handleChange} placeholder="Communication.." defaultValue={skills.title}/>
     
    </div>
    <div class="form-group">
        <label for="cat">Categorie</label>
     <select name="type" id="cat" class="form-control" onChange={handleChange} defaultValue={skills.type} >
<option value="Communication">Communication</option>
<option value="Leadership">Leadership</option>
<option value="Health Influencing">Influencing</option>
<option value="Interpersonal skills">Interpersonal skills</option>
<option value="personal skills">personal skills</option>
<option value="Creativity">Creativity</option>
<option value="Professional skills">Professional skills</option>

     </select>
     
     
      </div>
  
    <div class="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description</label>
        <textarea id="subject" name="description" class="form-control" onChange={handleChange} placeholder="Write something.." style={{height:200}} defaultValue={skills.description}></textarea>
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

