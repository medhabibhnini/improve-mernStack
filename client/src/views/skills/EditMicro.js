import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { CustomInput, FormGroup } from 'reactstrap';
import Loading from '../../utils/loading/Loading'

import image from "./softi.jpg";
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

const initialState = {
    title: '',
    description:'',
    macroId:'',
    err: '',
    success: ''
}
export default function EditMicro ()  {
    const [loading, setLoading] = useState(false)

    const {id} = useParams()
    const history = useHistory()
    const [data, setData] = useState(initialState)
    const [image, setImage] = useState(false)
    const token = useSelector(state => state.token)
    const [skills,getSkills] =useState([]);
    const [macros,getMacros] =useState([]);

    const {title,description,macroId, err, success} = data

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    const getAllSkills =()=>{
        axios.get(`/soft/getmicro/${id}`)
        .then((response)=>{
        const allSkills =response.data;
        getSkills(allSkills)
      
        
        }).catch(error=>console.error(`Error :${error}`));
        
        
        }
      
            const getMacross =()=>{
            axios.get('/soft/macroskills')
            .then((response)=>{
            const allSkills =response.data;
            getMacros(allSkills);
            }).catch(error=>console.error(`Error :${error}`));
            
            
            }
    


    useEffect(()=>{
        getAllSkills()
        getMacross()
    },[],[])
    const handleSubmit = async()=>{

        try{
const res = await axios.put(`/soft/updateMicro/${id}`,{
    title,description,macroId

})

setData({...data,err:'',success:res.data.msg})
}catch(err)
        {
            setData({...data, err: err.response.data.msg , success: ''})

        }
    }
   
    const handleUpdate =()=>{
if(title || description || macroId  ) 
{handleSubmit()
    history.push("/listmicro")

}
    }


    const styleUpload = {
        display: image ? "block" : "none"
    }   

    const handleUpload = async e =>{
      e.preventDefault()
      try {
          
          const file = e.target.files[0]
          
          if(!file) return alert("File not exist.")

          if(file.size > 1920 * 1080) // 1mb
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
          setImage(res.data.url)

      } catch (err) {
          alert(err.response.data.msg)
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

    {/*  <div style={{
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
      <label for="cat"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Macro skills :</label>
     <select name="macroId" id="cat" class="form-control" onChange={handleChange} >
   { macros.map(skill=>(
<option value={skill._id} key={skill._id}>{skill.title}</option>
 

    ) )}

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
   </div>*/ } 



<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Add Micro skills</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Add Micro skills</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Add Micro skills</h4>
						</div>
						<div class="widget-inner">
            <form onSubmit={handleUpdate} class="edit-profile m-b30">
            <div class="form-group">
        <label for="fname" >Title</label>
        <input type="text" id="fname" defaultValue={skills.title} style={{marginLeft:"45px",marginBottom:"35px"}}  class="form-control" name="title" onChange={handleChange} placeholder="Communication.."/>
    </div>
 
    <div class="form-group">
      <label for="cat"  >Macroskills</label>
     <select name="macroId" style={{marginLeft:"15px",marginBottom:"35px"}} id="cat" class="form-control" onChange={handleChange} >
   { macros.map(skill=>(
<option value={skill._id} key={skill._id}>{skill.title}</option>
 

    ) )}

     </select>
     
     
      </div>

  

      <div class="form-group">
        <label for="subject" >Description</label>
        <textarea id="subject" defaultValue={skills.description}  style={{marginLeft:"50px"}} class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div className="form-group"  style={{marginLeft:"70px"}}>
      <div className="upload">
      
 
      <CustomInput  type="file"  defaultValue={skills.image} name="file" id="file_up" onChange={handleUpload} />
  {
  loading ? <div id="file_img"><Loading /></div>
  :<div id="file_img" style={styleUpload}>
  <img src={image ? image.url : ''} alt=""/>
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

