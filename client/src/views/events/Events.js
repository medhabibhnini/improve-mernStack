import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
import React, { useState, useEffect, Component } from 'react';
// @material-ui/core components
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

import { isEmpty } from "../../components/utils/validation/Validation";
import { selectFields } from "express-validator/src/select-fields";
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

const initialState = {
  title: '',
  type: '',
  description: '',
  state: 'online',
  localisation: '',
  link: '',
  date:'',
  etatevent:'',
  price:'',
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
  const { title, type, description, state, localisation, link,date,etatevent,price, err, success } = data
  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }

  ///////////////////////////////////
  const handleUpload = async e => {
    e.preventDefault()
    try {

      const file = e.target.files[0]

      if (!file) return alert("File not exist.")

      if (file.size > 1024 * 1024) // 1mb
        return alert("Size too large!")

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
        return alert("File format is incorrect.")

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload_avatar', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      })
      setLoading(false)
      setAvatar(res.data.url)

    } catch (err) {
      alert(err.response.data.msg)
    }
  }
//////////////////////////////////////////
  const handleSubmit = async e => {
    e.preventDefault()
    if (isEmpty(title) || isEmpty(type) || isEmpty(description) || isEmpty(state) || isEmpty(localisation) || isEmpty(link) || isEmpty(date) || isEmpty(etatevent) || isEmpty(price) || isEmpty(avatar))

      return setData({ ...data, err: "Please fill in all fields ", success: '' })
    try {
      const res = await axios.post('http://localhost:5000/event/ajoutEvent', {
        title, type, description, state, localisation, link,date,etatevent,price,avatar
      })
      setData({ ...data, err: '', success: res.data.msg })
      history.push("./events")
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: '' })
    }



  }
//////////////////////////////////////////
  
  const changeAvatar = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]

      if (!file) return setData({ ...data, err: "No files were uploaded.", success: '' })

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: '' })

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return setData({ ...data, err: "File format is incorrect.", success: '' })

      let formData = new FormData()
      formData.append('file', file)

      setLoading(false)
      const res = await axios.post('/api/upload_avatar', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      })

      setLoading(false)
      setAvatar(res.data.url)

    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' })
    }
  }
  ///////////////////////////////
  
  console.log(data)
  return (
    <>
      <Dashboard />
      <div class="container" style={{ marginLeft: "300px", marginTop: "100px" }}>
        <div id="headers" className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ height: "400px", backgroundImage: 'url(https://www.lymehaus.com/wp-content/uploads/2020/05/eventsturkeyantalya.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>


          <h1 class="titre" style={{ marginLeft: "200px", fontSize: "100", color: "white" }}> Add Event </h1>
          <div class="overlay"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="fname" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Title :</label>
            <input type="text" id="fname" class="form-control" name="title" onChange={handleChange} placeholder="Titre.." />
          </div>

          <div class="form-group">
            <label htmlFor="lname" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Type :</label>
            <select id="lname" class="form-control" name="type" onChange={handleChange} name="type">
              <option value="TEDx talks">TEDx talks</option>
              <option value="Club mashups">Club mashups</option>
              <option value="Local city tours">Local city tours</option>
              <option value="Workshops">Workshops</option>
              <option value="Academic awards">Academic awards</option>
              <option value="Meet the grads">Meet the grads</option>
              <option value="Retreats and other stress-relief activities">Retreats and other stress-relief activities</option>
            </select>
          </div>

          <div class="form-group">
            <label htmlFor="subject" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>State :</label><br/>
          
          <input 
          type="radio"
          name="state"
          value="online"
          onChange={handleChange}
          checked={data.state==='online'}
          />
          <span style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Online</span>
            
          <input 
          type="radio" style={{marginLeft: '10px'}}
          name="state"
          value="presential"
          onChange={handleChange}
          checked={data.state==='presential'}
          />
          <span style={{ marginLeft: '15px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Presential</span><br/>
    <br></br>
            <label htmlFor="fname" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Link :</label>
            <input type="text" id="link" class="form-control" name="link" onChange={handleChange} placeholder="Link.."  disabled={data.state==='presential' } /><br/>

            <label htmlFor="fname" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Localisation :</label>
            <input type="text" id="localisation" class="form-control" name="localisation" onChange={handleChange} placeholder="Localisation.."  disabled={data.state==='online' } /><br/>
          
          </div>

          <div class="form-group">
            <label htmlFor="date" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Date of the event :</label>
            <input type="date" id="date"  class="form-control" name="date" onClick={handleChange} value="date" min="01-01-2021" max="12-31-2050"   />
          </div>

          <div class="form-group">
            <label htmlFor="subject" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Free/Paying event :</label><br/>
          
          <input 
          type="radio"
          name="etatevent"
          value="paying"
          onChange={handleChange}
          checked={data.etatevent==='paying'}
          />
          <span style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Paying</span>
            
          <input 
          type="radio" style={{marginLeft: '10px'}}
          name="etatevent"
          value="free"
          onChange={handleChange}
          checked={data.etatevent==='free'}
          />
          <span style={{ marginLeft: '15px', marginBottom: '0%', fontFamily: 'Arial', fontStyle: 'normal', fontSize: '18px' }}>Free</span><br/>
           <br></br>
            <label htmlFor="fname" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Price :</label>
            <input type="text" id="price" class="form-control" name="price" onChange={handleChange} placeholder="Price.."  disabled={data.etatevent==='free' || data.etatevent==='' } /><br/>

          </div>


          <div class="form-group">
            <label htmlFor="subject" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>Description :</label>
            <textarea id="subject" class="form-control" name="description" onChange={handleChange} placeholder="Write something.." style={{ height: 200 }}></textarea>
          </div>

          <div class="form-group">
            <label htmlFor="subject" style={{ marginLeft: '10px', marginBottom: '0%', fontFamily: 'Georgia', fontStyle: 'normal', fontSize: '20px' }}>photo :</label>
            <input className="form-control" type="file" name="file" id="file_up" onChange={handleUpload} />
          </div>

          <div class="row">
            <input type="submit" className="btn btn-primary" style={{ marginLeft: '50%' }} value="Submit" />
          </div>
        </form>
      </div>
    </>
  )
}
