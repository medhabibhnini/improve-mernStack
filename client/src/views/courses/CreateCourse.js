import React, {useState,useEffect} from "react";
import {useSelector} from 'react-redux'

// @material-ui/core components
import {useHistory} from 'react-router-dom'
import { CustomInput, FormGroup } from 'reactstrap';

import Loading from '../../utils/loading/Loading'

// core components
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

import { isEmpty } from "../../components/utils/validation/Validation";
import ListSoftSkills from "../skills/ListSoftSkills";
const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };
  
const initialState ={
title :'',
description :'',
category:'',
price:'',
link:'',
place:'',
instructor:'',
err: '',
success: ''

}



export default function CreateCourse() {
  const history = useHistory()

  const token = useSelector(state => state.token)

  const [hardskills,getHardSkills] =useState([]);
  useEffect(()=>{
    getAllHardSkills();},[]);
    const getAllHardSkills =()=>{
    axios.get('/hard/hardskills')
    .then((response)=>{
    const allHardSkills =response.data;
    getHardSkills(allHardSkills);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }
    

  const [softskills,getSkills] =useState([]);
  useEffect(()=>{
    getAllSkills();},[]);
    const getAllSkills =()=>{
    axios.get('/soft/getmicroskills')
    .then((response)=>{
    const allSkills =response.data;
    getSkills(allSkills);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }
console.log(softskills)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
    const [data, setData] = useState(initialState)
    const {title,category,description,price,link,place,instructor, err, success} = data
    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value, err:'', success: ''})
    }
    const styleUpload = {
        display: image ? "block" : "none"
    }   
    const handleDestroy = async () => {
        try {
     
            setLoading(true)
            await axios.post('/api/destroy', {public_id: image.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImage(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
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
    const handleSubmit = async e => {
e.preventDefault()
if(isEmpty(title) || isEmpty(description || isEmpty(category) || isEmpty(instructor)))

  return setData({...data,err:"Please fill in all fields ", success :''})
try {
const res = await axios.post('/api/courses',{
  title,description,category,image,link,price,place,instructor
})
setData({...data,err:'',success:res.data.msg})
history.push("./courses")
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}



    }









    
console.log(data)

  return (
    <>
    <Dashboard/>
    {/*
<div className="container" style={{marginLeft:"250px",marginTop:"100px"}}>
<div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://familyconnexions.ca/wp-content/uploads/2016/06/training.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 className="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}> Add A Course </h1>
<div className="overlay"></div>
</div>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title :</label>
        <input type="text" id="fname"  className="form-control" name="title" onChange={handleChange} />
      
    </div>
 
      <div className="form-group">
      <label htmlFor="categories">Categories: </label>
                  
              
              
                    <select name="microId" value={category} onChange={handleChange} >
                     
                       <option value=""></option>
                        {
                            softskills.map(softskills => (
                                <option value={softskills._id} key={softskills._id}>
                                    {softskills.title}
                                    
                                </option>
                            
                            ))
                        }
                          
                            
                    </select>

        
      </div>
<div className="form-group">
      <label htmlFor="categories">Categories: </label>
                  
              
              
                    <select name="category" value={category} onChange={handleChange} >
                        <option value=""></option>
                       
                        {
                            hardskills.map(hardskills => (
                                <option value={hardskills._id} key={hardskills._id}>
                                    {hardskills.title}
                                    
                                </option>
                            
                            ))
                        }
                       
                          
                            
                    </select>
                    
        
      </div>



      <div className="form-group">
        <label for="link">Link</label>
        <input type="text" id="link"  className="form-control" name="link" onChange={handleChange} />
        
      </div>
      <div className="form-group">
        <label for="price">Price</label>
        <input type="number" id="price"  className="form-control" name="price" onChange={handleChange} />
        
      </div>
      <div className="form-group">
        </div>
    <div className="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description :</label>
        <textarea id="subject"  className="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div className="form-group">
      <div className="upload">
      

      <CustomInput  type="file" name="file" id="file_up" onChange={handleUpload} />
     {
       loading ? <div id="file_img"><Loading /></div>
         :<div id="file_img" style={styleUpload}>
          <img src={image ? image.url : ''} alt=""/>
           </div>
        }
                
            </div>

</div>
<div>
</div>
    <div className="row">
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </div>
  </form>
</div>
 */}


<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Add Courses</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Add Courses</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Add Courses</h4>
						</div>
						<div class="widget-inner">
            <form onSubmit={handleSubmit} class="edit-profile m-b30">
            <div class="form-group">
        <label for="fname" >Title</label>
        <input type="text" id="fname" style={{marginLeft:"45px",marginBottom:"35px"}}  class="form-control" name="title" onChange={handleChange} />
    </div>
    <div className="form-group">
        <label for="price">Price</label>
        <input type="number" id="price" style={{marginLeft:"45px",marginBottom:"35px"}}  className="form-control" name="price" onChange={handleChange} />
      </div>
    
      <div className="form-group">
        <label for="instructor">Instructor</label>
        <input type="text" id="instructor" style={{marginLeft:"45px",marginBottom:"35px"}}  className="form-control" name="instructor" onChange={handleChange} />
      </div>
     
      <div class="form-group">
       <label for="fname" style={{marginLeft:"0px",marginBottom:"35px"}}>State :</label><br/>
      </div>
            <div class="form-group">

          <input 
          type="radio"
          name="state"
          value="online"
          onChange={handleChange}
          checked={data.state==='online'}
          />

          <span style={{ marginLeft: '10px', fontSize: '15px' }}>Online |</span>
          
          <span style={{ marginLeft: '10px', fontSize: '15px' }}>Presential</span>
            
          <input 
          type="radio" style={{marginLeft: '10px'}}
          name="state"
          value="presential"
          onChange={handleChange}
          checked={data.state==='presential'}
          />
                </div>

          <div class="form-group">
          <br></br>
          <label for="price">Link</label>
            <input type="text" id="link" style={{marginLeft:"45px",marginBottom:"35px"}} class="form-control" name="link" onChange={handleChange} placeholder="Link.."  disabled={data.state==='presential' } /><br/>
          </div>

          <div class="form-group">
            <label for="link">Location</label>
            <input type="text" id="place" style={{marginLeft:"25px",marginBottom:"35px"}} class="form-control" name="place" onChange={handleChange} placeholder="Location.."  disabled={data.state==='online' } /><br/>
            </div>
      


  <label>Category</label>
      <select name="category" style={{marginLeft:"45px",marginBottom:"35px"}} value={category} onChange={handleChange} >
                        <option value=""></option>
                       
                        {
                            hardskills.map(hardskills => (
                                <option value={hardskills.title} key={hardskills._id}>
                                    {hardskills.title}
                                    
                                </option>
                                     
                                     ))
                                    }
                        {
                          softskills.map(softskills => (
                              <option value={softskills.title} key={softskills._id}>
                                  {softskills.title}
                                  
                              </option>
                          
                          ))
                  
                        }
                       
                          
                            
                    </select>
      <div class="form-group">
        <label for="subject" >Description</label>
        <textarea id="subject"  style={{marginLeft:"50px"}} class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    
    <div className="form-group"  style={{marginLeft:"70px"}}>
      <div className="upload">
      
 
      <CustomInput  type="file"   name="file" id="file_up" onChange={handleUpload} />
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
  );
}
