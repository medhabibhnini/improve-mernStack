import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Dashboard from '../dashboard/dashboard'
import './table.css'
const initialState = {
    name: '',
    lastName:'',
    userName:'',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ListeUser() {
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
    const deleteuser = async (id) => {
        try {
            if(user._id !== id){
                //if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                      )
                    setLoading(false)
                    setCallback(!callback)
                //}
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteuser(id);
              
            }
          })
    }
    return (
  
        <>
<Dashboard/>
      
    
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <h3 class="mb-0">Card tables</h3>
              </div>
             
             {err && showErrMsg(err)}
           {success && showSuccessMsg(success)}
           {loading && <h3>Loading.....</h3>}
           <table  class="table align-items-center table-flush">
                        <thead  class="thead-light">
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                           
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>
                                        <a href="#" class="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src={user.avatar}/>
                        </a>
                          </td>
                                        <td><span className="mb-0 text-sm">{user.name}</span></td>
                                        <td><span className="mb-0 text-sm">{user.email}</span></td>
                                  
                                        <td>
                                            {
                                                user.role === 1
                                                ?   <span class="badge badge-dot">
                                                <i class="bg-success"></i> Admin
                                              </span>
                                                :   <span class="badge badge-dot">
                                                <i class="bg-warning"></i> user
                                              </span>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(user._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                   
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
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> 
        </>
    
    )
}

export default ListeUser