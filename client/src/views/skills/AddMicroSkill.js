import React, {useState, useEffect} from "react";
// @material-ui/core components
import {useHistory} from 'react-router-dom'
import { CustomInput, FormGroup } from 'reactstrap';
import Loading from '../../utils/loading/Loading'

import {useSelector} from 'react-redux'

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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
macroId:'',
err: '',
success: ''

}

export default function Softskills() {
  const history = useHistory()
  const [skills,getSkills] =useState([]);
  const [image, setImage] = useState(false)
  const token = useSelector(state => state.token)
  const [loading, setLoading] = useState(false)

    const [data, setData] = useState(initialState)
    const {title,description,macroId, err, success} = data
    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value, err:'', success: ''})
    }
    const handleSubmit = async e => {
e.preventDefault()
if(isEmpty(title) || isEmpty(macroId) || isEmpty(description))

  return setData({...data,err:"Please fill in all fields ", success :''})
try {
const res = await axios.post('http://localhost:5000/soft/ajoutMicro',{
  title,description,macroId,image
})
setData({...data,err:'',success:res.data.msg})
//history.push("./softskills")
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}
    }

    useEffect(()=>{
        getAllSkills();},[]);
        const getAllSkills =()=>{
        axios.get('http://localhost:5000/soft/macroskills')
        .then((response)=>{
        const allSkills =response.data;
        getSkills(allSkills);
        }).catch(error=>console.error(`Error :${error}`));
        
        
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


    return (
    <>
    <Dashboard/>
<div class="container" style={{marginLeft:"300px",marginTop:"100px",}}>
<div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.amalo-recrutement.fr/app/uploads/2020/01/soft-skills-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}> Add soft skills </h1>
<div class="overlay"></div>
</div>  <form onSubmit={handleSubmit}>
    <div class="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title :</label>
        <input type="text" id="fname"  class="form-control" name="title" onChange={handleChange} placeholder="Communication.."/>
    </div>
 
      <div class="form-group">
      <label for="cat"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Macro skills :</label>
     <select name="macroId" id="cat" class="form-control" onChange={handleChange} >
   { skills.map(skill=>(
<option value={skill._id} key={skill._id}>{skill.title}</option>
 

    ) )}

     </select>
     
     
      </div>





    <div class="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description :</label>
        <textarea id="subject"  class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
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

    <div class="row">
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </div>
  </form>
</div>
</>
  );
}
