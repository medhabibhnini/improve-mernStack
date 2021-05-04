import React,{useState, useEffect} from 'react'

import axios from 'axios'

import image from "./header.jpg";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import Dashboard from "../../components/body/dashboard/dashboard"
import { Button } from 'react-bootstrap';
const initialState ={
    title :'',
    type :'',
    description :'',
    categorie:'',
    err: '',
    success: ''
    
    }
export default function ListHardSkills()
{  const auth = useSelector(state => state.auth)

  const {user, isLogged, isAdmin} = auth

    const [skills,getSkills] =useState([]);
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const [data, setData] = useState(initialState)
    
    useEffect(()=>{
    getAllSkills();},[]);
    const getAllSkills =()=>{
    axios.get('http://localhost:5000/hard/hardskills')
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
        await axios.delete(`http://localhost:5000/hard/deleteskills/${id}`, {
    
      })
      setLoading(false)
      setCallback(!callback)
      window.location.reload(false);
    
      }
      
    
    
    } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
    }
    
    
    }




return(

<>
<Dashboard/>
      




<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Hard Skills</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Hard Skills</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Hard skills </h4>
              <Link to ="/addhard">
            <Button className=" " style={{marginTop:"20px"}}>Add hard skills + </Button>

            </Link >
						</div>
						<div class="widget-inner">
            { skills.map(skill =>(
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
													<h5>{skill.type}</h5>
													<h4>{skill.categorie}</h4>
												</div>
											</li>
											<li class="card-courses-categories">
											
											</li>
								
										
										</ul>
									</div>
									<div class="row card-courses-dec">
										<div class="col-md-12">
											<h6 class="m-b10">Skills Description</h6>
											<p>{skill.description} </p>	
										</div>
										<div class="col-md-12">
											<Link  to={`/edithard/${skill._id}`} class="btn green radius-xl outline">Edit</Link>
											<Link  onClick={() => handleDelete(skill._id)}  class="btn red outline radius-xl ">Delete</Link>
										</div>
									</div>
									
								</div>
							</div>
						
             ) )}
						
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