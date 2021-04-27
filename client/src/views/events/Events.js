import React, {useState, useEffect} from "react";
// @material-ui/core components
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


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
type :'',
description :'',
avatar: '',
err: '',
success: ''

}

export default function Events() {
  const history = useHistory()

  const token = useSelector(state => state.token)
  const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(false)
    const [data, setData] = useState(initialState)
    const {title,type,description, err, success} = data
    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value, err:'', success: ''})
    }
    const handleSubmit = async e => {
e.preventDefault()
if(isEmpty(title) || isEmpty(type) || isEmpty(description) || isEmpty(avatar))

  return setData({...data,err:"Please fill in all fields ", success :''})
try {
const res = await axios.post('http://localhost:5000/event/ajoutEvent',{
  title,type,description,avatar
})
setData({...data,err:'',success:res.data.msg})
history.push("./events")
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}



    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(false)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
console.log(data)
  return (
    <>
    <Dashboard/>
<div class="container" style={{marginLeft:"300px",marginTop:"100px"}}>
<div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.lymehaus.com/wp-content/uploads/2020/05/eventsturkeyantalya.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}> Add Event </h1>
<div class="overlay"></div>
</div>  <form onSubmit={handleSubmit}>
    <div class="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia',fontStyle:'normal',fontSize: '20px'}}>Title :</label>
        <input type="text" id="fname"  class="form-control" name="title" onChange={handleChange} placeholder="Titre.."/>
    </div>
    <div class="form-group">
        <label for="lname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia',fontStyle:'normal',fontSize: '20px'}}>Type :</label>
        <input type="text" id="lname"  class="form-control" name="type"  onChange={handleChange} placeholder="type.."/>
      </div>
  
    <div class="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia',fontStyle:'normal',fontSize: '20px'}}>Description :</label>
        <textarea id="subject"  class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div class="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia',fontStyle:'normal',fontSize: '20px'}}>photo :</label>
        <input  className="fas fa-camera" type="file" name="file" id="file_up" onChange={changeAvatar} />
    </div>
    <div class="row">
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </div>
  </form>
</div>
</>
  );
}
