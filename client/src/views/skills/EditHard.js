import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import image from "./softi.jpg";
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"
import "../../admin/assets/css/assets.css"
import "../../admin/assets/vendors/calendar/fullcalendar.css"
import "../../admin/assets/css/typography.css"
import "../../admin/assets/css/shortcodes/shortcodes.css"
import "../../assets/css/style.css"
import "../../admin/assets/css/dashboard.css"
import "../../assets/css/color/color-1.css"
import 'bootstrap/dist/css/bootstrap.min.css';


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
        axios.get(`/hard/gethard/${id}`)
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
history.push("/hardskills")

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



<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Add Hard</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Edit Hard skills</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Edit Hard skills</h4>
						</div>
						<div class="widget-inner">
            <form  onSubmit={handleUpdate} class="edit-profile m-b30">
    <div class="form-group">
        <label for="fname" >Title</label>
        <input type="text" id="fname"    style={{marginLeft:"45px",marginBottom:"25px"}}class="form-control" name="title" onChange={handleChange} defaultValue={skills.title} />
    </div>
    <div class="form-group">
        <label for="lname">Type</label>
        <input type="text" id="lname"  style={{marginLeft:"45px",marginBottom:"25px"}}  class="form-control" name="type"  onChange={handleChange} defaultValue={skills.type}/>
      </div>
  
      <div class="form-group">
        <label for="cat">Categorie</label>
     <select name="categorie" id="cat" class="form-control"  style={{marginLeft:"15px",marginBottom:"25px"}} onChange={handleChange} name="categorie" defaultValue={skills.categorie}>
<option value="informatic">Informatic</option>
<option value="bussiness">Business</option>
<option value="Health care">Health care</option>
<option value="Mathematic">Mathematic</option>

     </select>
     
     
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

