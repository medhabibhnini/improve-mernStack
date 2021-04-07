import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'

import Dashboard from '../dashboard/dashboard'
function EditUser() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id){
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            })
        }else{
            history.push('/users')
        }
    },[users, id, history])

    const handleUpdate = async () => {
        try {
            if(num % 2 !== 0){
                const res = await axios.patch(`/user/update_role/${editUser._id}`, {
                    role: checkAdmin ? 1 : 0
                }, {
                    headers: {Authorization: token}
                })

                setSuccess(res.data.msg)
                setNum(0)
            }else{
                history.goBack()
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    return (
        <>
<Dashboard/>
           
      <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
   <br></br>
 
       <div className="main-content">
     
    
   
    

     <div className="container-fluid mt--7">
       <div className="row">
         <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
           <div className="card card-profile shadow">
             <div className="row justify-content-center">
               <div className="col-lg-3 order-lg-2">
                 <div className="card-profile-image">
                   <a href="#">
                     <img src={editUser.avatar} className="rounded-circle"/>
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
                 {editUser.name} {editUser.lastName}<span className="font-weight-light"></span>
                 </h3>
                 <div className="h5 font-weight-300">
                 
                 </div>
                 <div className="h5 mt-4">
                   <i className="ni business_briefcase-24 mr-2"></i>{editUser.email}
                 </div>
                
         
               
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
                   <button onClick={() => history.goBack()}  className="btn btn-sm btn-primary">Go Back</button>
                 </div>
               </div>
             </div>
             <div className="card-body">
             {err && showErrMsg(err)}
           {success && showSuccessMsg(success)}
      
               <form>
                 <h6 className="heading-small text-muted mb-4">User information</h6>
                 <div className="pl-lg-4">
                   <div className="row">
                  
                     <div className="col-lg-6">
                       <div className="form-group">
                         <label className="form-control-label" for="input-email">Email address</label>
                         <input type="email" id="input-email" className="form-control form-control-alternative"  defaultValue={editUser.email} disabled/>
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-lg-6">
                       <div className="form-group focused">
                         <label className="form-control-label" for="input-first-name">First name</label>
                         <input type="text" id="name"  className="form-control form-control-alternative" name="name"  defaultValue={editUser.name} disabled/>
                       </div>
                     </div>
                     
                   </div>
                   <div className="row">
                     <div className="col-lg-6">
                     <div class="custom-control custom-control-alternative custom-checkbox">
                            <input class="custom-control-input" id="isAdmin" checked={checkAdmin}
                    onChange={handleCheck} type="checkbox"/>
                            <label class="custom-control-label" htmlFor="isAdmin">
                              <span class="text-muted">Admin</span>
                            </label>
                          </div>
                     </div>
                     
                   </div>
                   <div className="col-md-12 text-center">
                   <button   className="btn btn-primary" onClick={handleUpdate}>Make Admin</button>
                   </div>
                 </div>
              
       
               </form>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>

        </>
    )
}

export default EditUser
