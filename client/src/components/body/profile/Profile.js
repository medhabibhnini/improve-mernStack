import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import './profile.css'
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
      
      <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>

       <div className="main-content">
     
    
   
     <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px' ,backgroundImage: 'url(https://collectivevaluecreation.co.za/wp-content/uploads/2018/10/my-account-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>

       <span className="mask bg-gradient-default opacity-8"></span>
 
       <div className="container-fluid d-flex align-items-center">
         <div className="row">
           <div className="col-lg-7 col-md-10">
          
           </div>
         </div>
       </div>
     </div>

     <div className="container-fluid mt--7">
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
                       <input  className="fas fa-camera" type="file" name="file" id="file_up" onChange={changeAvatar} />
                       <button   className="btn btn-primary" onClick={handleUpdate}>Edit profile</button>
               </div>
             </div>
           </div>
         </div>
         <div className="col-xl-8 order-xl-1">
           <div className="card bg-secondary shadow">
             <div className="card-header bg-white border-0">
               <div className="row align-items-center">
                 <div className="col-8">
                   <h3 className="mb-0">My account</h3>
                 </div>
                 <div className="col-4 text-right">
                   <a href="#!" className="btn btn-sm btn-primary">Settings</a>
                 </div>
               </div>
             </div>
             <div className="card-body">
             {err && showErrMsg(err)}
           {success && showSuccessMsg(success)}
           {loading && <h3>Loading.....</h3>}
               <form>
                 <h6 className="heading-small text-muted mb-4">User information</h6>
                 <div className="pl-lg-4">
                   <div className="row">
                     <div className="col-lg-6">
                       <div className="form-group focused">
                         <label className="form-control-label" for="input-username">Username</label>
                         <input type="text" id="input-username" name="userName" className="form-control form-control-alternative" defaultValue={user.userName} onChange={handleChange}/>
                       </div>
                     </div>
                     <div className="col-lg-6">
                       <div className="form-group">
                         <label className="form-control-label" for="input-email">Email address</label>
                         <input type="email" id="input-email" className="form-control form-control-alternative"  defaultValue={user.email} disabled/>
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-lg-6">
                       <div className="form-group focused">
                         <label className="form-control-label" for="input-first-name">First name</label>
                         <input type="text" id="name"  className="form-control form-control-alternative" name="name"  defaultValue={user.name} onChange={handleChange}/>
                       </div>
                     </div>
                     <div className="col-lg-6">
                       <div className="form-group focused">
                         <label className="form-control-label" for="input-last-name">Last name</label>
                         <input type="text" id="input-last-name" className="form-control form-control-alternative" name="lastName" defaultValue={user.lastName} onChange={handleChange}/>
                       </div>
                     </div>
                   </div>
                   <div className="col-md-12 text-center">
                   <button disabled={loading}  className="btn btn-primary" onClick={handleUpdate}>Edit profile</button>
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