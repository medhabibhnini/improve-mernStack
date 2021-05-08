import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import image from "./softi.jpg";
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

const initialState = {
    title: '',
    description:'',
    err: '',
    success: ''
}
export default function EditMacro  ()  {
    const {id} = useParams()
    const history = useHistory()
    const [data, setData] = useState(initialState)

    const [skills,getSkills] =useState([]);
    
    const {title,description, err, success} = data

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    const getAllSkills =()=>{
        axios.get(`/soft/getmacro/${id}`)
        .then((response)=>{
        const allSkills =response.data;
        getSkills(allSkills)
      
        
        }).catch(error=>console.error(`Error :${error}`));
        
        
        }



    useEffect(()=>{
        getAllSkills() },[])
    const handleSubmit = async()=>{

        try{
const res = await axios.put(`/soft/updateMacro/${id}`,{
    title,description

})

setData({...data,err:'',success:res.data.msg})
}catch(err)
        {
            setData({...data, err: err.response.data.msg , success: ''})

        }
    }
   
    const handleUpdate =()=>{
if(title || description  ) 
{handleSubmit()
    history.push("/listmacro")

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

    { /* <div style={{
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
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description</label>
        <textarea id="subject" name="description" class="form-control" onChange={handleChange} placeholder="Write something.." style={{height:200}} defaultValue={skills.description}></textarea>
    </div>
    <div class="row">
      <input type="submit" className="btn btn-primary" variant="primary" style={{marginLeft:'50%'}} value="Submit"/>
    </div>
  </form>
</div>
<footers/>
    </div>  */}

<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Edit macro skills</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Edit macro skills</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Edit macro skills</h4>
						</div>
						<div class="widget-inner">
            <form  onSubmit={handleUpdate} class="edit-profile m-b30">
    <div class="form-group">
        <label for="fname" >Title</label>
        <input type="text" id="fname"    style={{marginLeft:"45px",marginBottom:"25px"}}class="form-control" name="title" onChange={handleChange} defaultValue={skills.title} />
    </div>

    <div class="form-group">
        <label for="subject">Description </label>
        <br></br>
        <textarea id="subject"  style={{marginLeft:"50px"}}  class="form-control" name="description"  onChange={handleChange} defaultValue={skills.description} style={{height:200}}></textarea>
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

