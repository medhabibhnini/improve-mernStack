import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import SimpleImageSlider from "react-simple-image-slider";
import jQuery from "jquery"
import bg1 from "../../../assets/images/background/bg1.jpg"

import revslider_showDoubleJqueryError from "jquery"
import slider1 from "../../../assets/images/slider/slide1.jpg"
import slider2 from "../../../assets/images/slider/slide2.jpg"
import pic1 from "../../../assets/images/our-services/pic1.jpg"
import pic4 from "../../../assets/images/event/pic4.jpg"

import "../../../assets/css/assets.css"

import "../../../assets/css/typography.css"
import "../../../assets/css/shortcodes/shortcodes.css"
	

import "../../../assets/css/style.css"


import "../../../assets/css/color/color-1.css"

import "../../../assets/vendors/revolution/css/layers.css"
import "../../../assets/vendors/revolution/css/settings.css"
import "../../../assets/vendors/revolution/css/navigation.css"

import { CustomInput, FormGroup } from 'reactstrap';
import UserPostsWrapper from "../../../views/UserPosts/UserPostsWrapper";


const initialState = {
    name: '',
    lastName:'',
    userName:'',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)
    
    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name,lastName,userName, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])
 
    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
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

    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                lastName:lastName? lastName:user.lastName,
                userName:userName? userName :user.userName,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || lastName || userName || avatar ) updateInfor()
        if(password) updatePassword()
    }

    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    return (
  
        <>
      <Header />
      
   

       <div class="page-content bg-white">
     
       <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
            <div class="container">
                <div class="page-banner-entry">
                    <h1 class="text-white">Profile</h1>
				 </div>
            </div>
        </div>

<br></br>
<br></br>
<br></br>

     <div className="content-block">
       <div className="row">
         <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
           <div className="card card-profile shadow">
             <div className="row justify-content-center">
               <div className="col-lg-3 order-lg-2">
                 <div className="card-profile-image">
                   <a href="#">
                     <img src={avatar ? avatar : user.avatar} className="rounded-circle"/>
                   </a>
                 </div>
               </div>
             </div>
             <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
               <div className="d-flex justify-content-between">
     
               </div>
             </div>
             <div className="card-body pt-0 pt-md-4">
               <div className="row">
                 <div className="col">
                   <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                     <div>
                     
                     </div>
                     <div>
                      
                     </div>
                     <div>
                    
                     </div>
                   </div>
                 </div>
               </div>
               <div className="text-center">
                 <h3>
                 {user.name} {user.lastName}<span className="font-weight-light"></span>
                 </h3>
                 <div className="h5 font-weight-300">
                 
                 </div>
                 <div className="h5 mt-4">
                   <i className="ni business_briefcase-24 mr-2"></i>{user.email}
                 </div>
                 <div>
                   <i className="ni education_hat mr-2"></i>University of Computer Science
                 </div>
                 <hr className="my-4"/>
                 <i className="fas fa-camera"></i>
                       <p>Change</p>
                       <CustomInput  type="file" name="file" id="file_up" onChange={changeAvatar} />
                       <hr className="my-4"/>
                       <button   className="btn btn-primary" onClick={handleUpdate}>Edit profile</button>
                
               </div>
             </div>
           </div>
         </div>
         <div className="col-xl-8 order-xl-1" style={{backgroundColor:"white",marginLeft:"5px",marginLeft:"0px"}}>
           <div className="card bg-secondary shadow">
             <div className="card-header bg-white border-0">
               <div class="tab-pane" id="edit-profile">
                 <div class="profile-head">
                   <h3 className="mb-0">My account</h3>
                 </div>
               
               </div>
             </div>
             <div className="card-body"  style={{backgroundColor:"white",borderStyle:"none"}}>
             {err && showErrMsg(err)}
           {success && showSuccessMsg(success)}
           {loading && <h3>Loading.....</h3>}
               <form  class="edit-profile">
               <div class="form-group row">
													<div class="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
														<h3>1. Personal Details</h3>
													</div>
												</div>

                        <div class="form-group row">
													<label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Username</label>
													<div class="col-12 col-sm-9 col-md-9 col-lg-7">
														<input class="form-control" name="userName" type="text"defaultValue={user.userName} onChange={handleChange}/>
													</div>
												</div>
                        <div class="form-group row">
													<label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Email address</label>
													<div class="col-12 col-sm-9 col-md-9 col-lg-7">
														<input class="form-control" type="text" defaultValue={user.email} disabled/>
													</div>
												</div>
                        <div class="form-group row">
													<label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">First name</label>
													<div class="col-12 col-sm-9 col-md-9 col-lg-7">
														<input class="form-control" type="text" name="name"  defaultValue={user.name} onChange={handleChange}/>
													</div>
												</div>
                        <div class="form-group row">
													<label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Lastname </label>
													<div class="col-12 col-sm-9 col-md-9 col-lg-7">
														<input class="form-control" type="text" name="lastName" defaultValue={user.lastName} onChange={handleChange}/>
													</div>
												</div>

                        <div class="">
												<div class="">
													<div class="row">
														<div class="col-12 col-sm-3 col-md-3 col-lg-2">
														</div>
														<div class="col-12 col-sm-9 col-md-9 col-lg-7">
															<button  disabled={loading}   class="btn btn-primary"  onClick={handleUpdate}>Save changes</button>
														</div>
													</div>
												</div>
											</div>

       
               </form>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
<br></br>
<br></br>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>  <Footer/>
        </>
    
    )
}

export default Profile