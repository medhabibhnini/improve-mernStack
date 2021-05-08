import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllSoft, dispatchGetAllSkills} from '../../redux/actions/softskillsAction'
import axios from 'axios'
import {Link} from 'react-router-dom'
import image from "./header.jpg";
import Swal from 'sweetalert2'
import Pagination from '../../components/body/profile/Pagination'

import Dashboard from "../../components/body/dashboard/dashboard"
import { Button } from 'react-bootstrap';

import { $CombinedState } from 'redux'
const initialState ={
  title :'',
 
  description :'',
  err: '',
  success: ''
  
  }
  
const ListMacroSkills = () => {
const [skills,getSkills] =useState([]);
const [loading, setLoading] = useState(false)
const [callback, setCallback] = useState(false)
const [data, setData] = useState(initialState)
const auth = useSelector(state => state.auth)
const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(3);
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const paginate = pageNumber => setCurrentPage(pageNumber);

const currentPosts = skills.slice(indexOfFirstPost, indexOfLastPost);
const {user, isLogged, isAdmin} = auth
useEffect(()=>{
getAllSkills();},[]);
const getAllSkills =()=>{
axios.get('/soft/macroskills')
.then((response)=>{
const allSkills =response.data;
getSkills(allSkills);
}).catch(error=>console.error(`Error :${error}`));


}
const handleDelete = async (id) =>{
try{
  if(window.confirm("Are you sure ? Do you want to delete this soft skills"))
  {                  
      setLoading(true)
    await axios.delete(`/soft/deletemacro/${id}`, {

  })
  setLoading(false)
  setCallback(!callback)
  window.location.reload(false);

  }
  


} catch (err) {
  setData({...data, err: err.response.data.msg , success: ''})
}


}
const mystyle = {
  marginLeft:"60%"
     };
    return (
      <>
        <Dashboard/>
 { /*    
<div class="col">
          <div class="card shadow">
            <div class="card-header border-0" >
              <h3 class="mb-0">Card tables</h3>
              </div>
              <div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.amalo-recrutement.fr/app/uploads/2020/01/soft-skills-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"450px",fontSize:"100",color:"white"}}> Soft skills management </h1>
<div class="overlay"></div>
</div>
<Link to ="/addmacro">
            <Button className=" " style={{marginTop:"30px", marginLeft:"1300px",width:"150px"}}>Add macro skills +</Button>

            </Link >
           <table class="table align-items-center table-flush" style={{marginLeft:"200px",marginRight:"100px"}}>
                        <thead class="thead-light">
                        <tr>
            <th>Title</th>
            <th >Description</th>
            <th >Actions</th>
          </tr>
                        </thead>
                        <tbody>
                        { skills.map(skill =>(
          <tr   key={skill._id}>
            <td>{skill.title}</td>
            <td>{skill.description}</td>
            <td>
            <Link  to={`/editmacro/${skill._id}`}>
                                                <Button className="fas fa-edit btn btn-warning" title="Edit" style={{height:'40px',width:'60px',marginLeft:'50px'}} > </Button>
                                          
                                            </Link>
               <Button className="fas fa-trash-alt  btn btn-danger"  title="Remove" style={{height:'40px',width:'60px'}} 
                                    onClick={() => handleDelete(skill._id)}         ></Button></td>
          </tr>
           ) )}
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
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>*/ }




<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Macro soft Skills</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Macro soft Skills</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Macro soft skills </h4>
              <Link to ="/addmacro">
            <Button className=" " style={{marginTop:"20px"}}>Add Macro skills + </Button>

            </Link >
						</div>
        
            <div class="input-group">
                <input class="form-control border-end-0 border rounded-pill" type="text" placeholder="search" style={{marginLeft:"600px",width:"150px"}} id="example-search-input"
                   onChange={(event) => {
                    setSearch(event.target.value);
                }}
                />
                <span class="input-group-append">
                    <button class="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3" type="button">
                        <i class="fa fa-search"></i>
                    </button>
                </span>
     </div>
						<div class="widget-inner">
           {  currentPosts.filter((val)=> {
                                    if (search =="") {
                                        return val
                                    } else if ((val.title.toLowerCase().includes(search.toLowerCase())) 
                                    ) {
                                        return val
                                    }
                                }).map(skill =>(
							<div  key={skill._id} class="card-courses-list admin-courses">
								<div class="card-courses-media">
									<img src="assets/images/courses/pic1.jpg" alt=""/>
								</div>
								<div class="card-courses-full-dec">
									<div class="card-courses-title">
										<h4>{skill.title}</h4>
									</div>
									<div class="card-courses-list-bx">
										<ul class="card-courses-view">
											<li class="card-courses-user">
												<div class="card-courses-user-pic">
													<img src= {user.avatar} alt=""/>
												</div>
												<div class="card-courses-user-info">
										
												</div>
											</li>
											<li class="card-courses-categories">
											
											</li>
								
										
										</ul>
									</div>
									<div class="row card-courses-dec">
										<div class="col-md-12">
											<h6 class="m-b10">Macro Skills Description</h6>
											<p>{skill.description} </p>	
										</div>
										<div class="col-md-12">
											<Link  to={`/editmacro/${skill._id}`} class="btn green radius-xl outline">Edit</Link>
											<Link  onClick={() => handleDelete(skill._id)}  class="btn red outline radius-xl ">Delete</Link>
										</div>
									</div>
									
								</div>
							</div>
						
             ) )}
						
            <div style={{marginLeft:"500px"}}>
                    <Pagination postsPerPage={postsPerPage} totalPosts={skills.length} paginate={paginate} />
                    </div> 
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
	<div class="ttr-overlay"></div>






</>

    )
}

export default ListMacroSkills
