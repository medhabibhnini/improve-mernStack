import React, {useState,useEffect} from "react";
import {useSelector} from 'react-redux'

// @material-ui/core components
import {useHistory} from 'react-router-dom'
import { CustomInput, FormGroup } from 'reactstrap';


// core components
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

import { isEmpty } from "../../components/utils/validation/Validation";
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
err: '',
success: ''

}

export default function CreateCourse() {
  const history = useHistory()
    
  const token = useSelector(state => state.token)

  const [hardskills] =useState([]);
  useEffect(()=>{
    getAllHardSkills();},[]);
    const getAllHardSkills =()=>{
    axios.get('http://localhost:5000/hard/hardskills')
    .then((response)=>{
    const allHardSkills =response.data;
    getAllHardSkills(allHardSkills);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }

  const [softskills,getSkills] =useState([]);
  useEffect(()=>{
    getAllSkills();},[]);
    const getAllSkills =()=>{
    axios.get('http://localhost:5000/soft/softskills')
    .then((response)=>{
    const allSkills =response.data;
    getSkills(allSkills);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }


  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
    const [data, setData] = useState(initialState)
    const {title,category,description,price,link, err, success} = data
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
            setImage(res.data.url)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleSubmit = async e => {
e.preventDefault()
if(isEmpty(title) || isEmpty(description || isEmpty(link) || isEmpty(category)))

  return setData({...data,err:"Please fill in all fields ", success :''})
try {
const res = await axios.post('http://localhost:5000/api/courses',{
  title,description,category,image,link,price
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
<div className="container" style={{marginLeft:"300px",marginTop:"100px"}}>
<div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.amalo-recrutement.fr/app/uploads/2020/01/soft-skills-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              
<p>softskills</p>
              <h1 className="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}> Add soft skills </h1>
<div className="overlay"></div>
</div>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title :</label>
        <input type="text" id="fname"  className="form-control" name="title" onChange={handleChange} />
    </div>
 
      <div className="form-group">
      <label htmlFor="categories">Categories: </label>
                    <select name="category" value={category} onChange={handleChange} >
                        <option value="">Please select a category</option>
                        {
                            softskills.map(softskills => (
                                <option value={softskills.title} key={softskills._id}>
                                    {softskills.title}
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
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description :</label>
        <textarea id="subject"  className="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div className="form-group">
      <div className="upload">
      <CustomInput  type="file" name="file" id="file_up" onChange={handleUpload} />

                
            </div>

</div>
    <div className="row">
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </div>
  </form>
</div>
</>
  );
}
