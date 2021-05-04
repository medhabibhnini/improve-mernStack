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
import MaterialTable from 'material-table';
import Pagination from './Pagination'
import { Table } from 'reactstrap'
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
    const [q, setQ] = useState("");
    /*function search(rows){
        return rows.filter(row => row.userName.toLowerCase().indexOf(q) > -1)
    }*/
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    
    /* pagination*/
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    // search
    const [search, setSearch] = useState("");
   //filter
   //const roleAdmin = this
    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

   

    /*const updateInfor = () => {
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
    }*/

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

   /* const handleUpdate = () => {
        if(name || lastName || userName || avatar ) updateInfor()
        if(password) updatePassword()
    }*/
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

      <div>
           <input
           type="text"
           placeholder="search .."
           onChange={(event) => {
               setSearch(event.target.value);
           }}
           >
           </input>
           <Pagination postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate}/>
           </div>

        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <h3 class="mb-0">Card tables</h3>
              </div>
      
             {err && showErrMsg(err)}
           {success && showSuccessMsg(success)}
           {loading && <h3>Loading.....</h3>}
           

           <Table /*data={search(data)} */ class="table align-items-center table-flush">

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
                                currentPosts.filter((val)=> {
                                    if (search =="") {
                                        return val
                                    } else if ((val.name.toLowerCase().includes(search.toLowerCase())) ||
                                    (val.email.toLowerCase().includes(search.toLowerCase()))
                                    ) {
                                        return val
                                    }
                                }).map(user => (
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
                    </Table>

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