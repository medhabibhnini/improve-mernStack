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
    categorie:'',
    err: '',
    success: ''
}
export default function EditHard  ()  {
    const {id} = useParams()
    const history = useHistory()
    const [data, setData] = useState(initialState)

    const [editSkills,setEditSkills]= useState([])
    const [skills,getSkills] =useState([]);
    
    const {title,description,type,categorie, err, success} = data

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    const getAllSkills =()=>{
        axios.get(`http://localhost:5000/hard/gethard/${id}`)
        .then((response)=>{
        const allSkills =response.data;
        getSkills(allSkills)
      
        
        }).catch(error=>console.error(`Error :${error}`));
        
        
        }



    useEffect(()=>{
        getAllSkills() },[])
    const handleSubmit = async()=>{

        try{
const res = await axios.put(`http://localhost:5000/hard/updateHard/${id}`,{
    title,type,description,categorie

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
    history.push("/hardskills")

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
              

              <h1 class="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}>Edit hard skills </h1>
<div class="overlay"></div>
</div>  <form onSubmit={handleUpdate}>
    <div class="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title</label>
     
        <input type="text" class="form-control"  id="fname" name="title" onChange={handleChange} placeholder="Communication.." defaultValue={skills.title}/>
     
    </div>
    <div class="form-group">
        <label for="lname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Type</label>
        <input type="text" class="form-control" id="lname" name="type"  onChange={handleChange} placeholder="type.." defaultValue={skills.type}/>
    </div>
    <div class="form-group">
        <label for="cat">Categorie</label>
     <select name="categorie" id="cat" class="form-control" onChange={handleChange} name="categorie" defaultValue={skills.categorie}>
<option value="informatic">Informatic</option>
<option value="bussiness">Business</option>
<option value="Health care">Health care</option>
<option value="Mathematic">Mathematic</option>

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
