import React,{useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import axios from 'axios'
import { Button ,Modal} from 'react-bootstrap';
import {useSelector} from 'react-redux'
import { isEmpty } from "../../components/utils/validation/Validation";
import {Link} from 'react-router-dom'
import Pagination from '../../components/body/profile/Pagination'

import Swal from 'sweetalert2'

import "../../assets/css/assets.css"

import "../../assets/css/typography.css"
import "../../assets/css/shortcodes/shortcodes.css"
	

import "../../assets/css/style.css"


import "../../assets/css/color/color-1.css"

import "../../assets/vendors/revolution/css/layers.css"
import "../../assets/vendors/revolution/css/settings.css"
import "../../assets/vendors/revolution/css/navigation.css"
import {useParams, useHistory} from 'react-router-dom'
const initialState ={
    title :'',
    type :'',
    description :'',
    categorie:'',
    err: '',
    success: ''
    
    }
    const initialScore ={
 UserId:'',
 score :'',
 err: '',
 success: ''

    }
export default function ListHard  (){
    const history = useHistory()
    const  [show,setShow] =useState(false);
    const [skills,getSkills] =useState([]);
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const [data, setData] = useState(initialState)
    const auth = useSelector(state => state.auth)
 const [datas ,setDatas]= useState(initialScore);
 const {UserId,score,err,success}=datas;
const {userSkill,getUserskill}=useState([]);
const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(3);
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = skills.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNumber => setCurrentPage(pageNumber);
 const {id} = useParams()
   
 const {user, isLogged, isAdmin} = auth
    useEffect(()=>{
    getAllSkills();},[]);
    const getAllSkills =()=>{
    axios.get('http://localhost:5000/hard/hardskills')
    .then((response)=>{
    const allSkills =response.data;
    getSkills(allSkills);
    }).catch(error=>console.error(`Error :${error}`));
  
    }

    const getUsersSkills =()=>{
      axios.get( `http://localhost:5000/hard/getSkillhard/${id}`,{UserId: user._id})
      .then((response)=>{
      const allSkills =response.data;
      getUserskill(allSkills);
      console.log(allSkills)
      }).catch(error=>console.error(`Error :${error}`));
    
      }




    const handleChange = e => {
        const {name, value} = e.target
        datas.UserId=user._id;

        setDatas({...datas, [name]:value, err:'', success: ''})
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
    const handleModal =()=>
    { 

      
        setShow(true);
    }
    const closeModal =()=>
    {
        setShow(false);
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(score))
          {  Swal.fire(
            'Error!',
            'You must fill all the blanks.',
            'error'
          )
            return setDatas({...datas,err:"Please fill in all fields ", success :''})
          }
            try {
 
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, add it!'
        }).then((result) => {
          if (result.isConfirmed) {
            const res =  axios.post(`/hard/affecterHard/${id}`,{
              score,UserId
            })
         //   setData({...data,err:'',success:res.data.msg})
         //setDatas({...datas,err:'',success:res.data.msg})
        closeModal()
          }
        })




      } catch(err)
        {  Swal.fire(
          'Error!',
          'Error.',
          'error'
        )
          err.response.data.msg && 
          setDatas({...datas, err: err.response.data.msg, success: ''})
        }
      
        
        
            }

const test=()=>{
    if(userSkill)
  return true
  else  return false;
}

           


  
  return (

        <>
            <Header/>
            <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
          <div class="container">
              <div class="page-banner-entry">
                  <h1 class="text-white">Hard skills</h1>
       </div>
          </div>
      </div>
      <div class="content-block">
			<div class="section-area section-sp1">
                <div class="container">
					 <div class="row">
						<div class="col-lg-3 col-md-4 col-sm-12 m-b30">
							<div class="widget courses-search-bx placeani">
								<div class="form-group">
									<div class="input-group">
										<label>Search Courses</label>
										<input name="dzName" type="text" required class="form-control"/>
									</div>
								</div>
							</div>
							<div class="widget widget_archive">
                                <h5 class="widget-title style-1">All Courses</h5>
                                <ul>
                                    <li class="active"><a href="#">General</a></li>
                                    <li><a href="#">IT & Software</a></li>
                                    <li><a href="#">Photography</a></li>
                                    <li><a href="#">Programming Language</a></li>
                                    <li><a href="#">Technology</a></li>
                                </ul>
                            </div>
							<div class="widget">
								<a href="#"><img src="assets/images/adv/adv.jpg" alt="Hard skills advancement"/></a>
							</div>
							<div class="widget recent-posts-entry widget-courses">
                                <h5 class="widget-title style-1">Recent Courses</h5>
                                <div class="widget-post-bx">
                                    <div class="widget-post clearfix">
                                        <div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic1.jpg" width="200" height="143" alt="forum online courses"/> </div>
                                        <div class="ttr-post-info">
                                            <div class="ttr-post-header">
                                                <h6 class="post-title"><a href="#">Introduction EduChamp</a></h6>
                                            </div>
                                            <div class="ttr-post-meta">
                                                <ul>
                                                    <li class="price">
														<del>$190</del>
														<h5>$120</h5>
													</li>
                                                    <li class="review">03 Review</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget-post clearfix">
                                        <div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic3.jpg" width="200" height="160" alt=""/> </div>
                                        <div class="ttr-post-info">
                                            <div class="ttr-post-header">
                                                <h6 class="post-title"><a href="#">English For Tommorow</a></h6>
                                            </div>
                                            <div class="ttr-post-meta">
                                                <ul>
                                                    <li class="price">
														<h5 class="free">Free</h5>
													</li>
                                                    <li class="review">07 Review</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>

        		<div class="col-lg-9 col-md-8 col-sm-12">
            <Link to="/addhards"><Button>Add hard Skills +</Button></Link>  

							<div class="row">
    

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

           
           {  currentPosts.filter((val)=> {
                                    if (search =="") {
                                        return val
                                    } else if ((val.title.toLowerCase().includes(search.toLowerCase())) 
                                    ) {
                                        return val
                                    }
                                }).map( skill =>(   

								<div class="col-md-6 col-lg-4 col-sm-6 m-b30">
									<div class="cours-bx">
										<div class="action-box">
											<img src="assets/images/courses/pic1.jpg" alt="Online education"/>
									 <Link to={`/listHard/${skill._id}`}>
                  		<button   onClick={handleModal} class="btn btn-red"  style={{color:'white'}}>Add score</button>
                      </Link>
                  	</div>
										<div class="info-bx text-center">
											<h5><a href="#">{skill.title} </a></h5>
											<span>{skill.type} </span>
										</div>
										<div class="cours-more-info">
											<div class="review">
												<span>3 Review</span>
												<ul class="cours-star">
													<li class="active"><i class="fa fa-star"></i></li>
													<li class="active"><i class="fa fa-star"></i></li>
													<li class="active"><i class="fa fa-star"></i></li>
													<li><i class="fa fa-star"></i></li>
													<li><i class="fa fa-star"></i></li>
												</ul>
											</div>
											<div class="price">
												<del>{skill.categorie} </del>
												<h5>{skill.categorie}</h5>
											</div>
										</div>
									</div>
                  
								</div> 
                ))}
							
<div style={{marginLeft:"500px"}}>
                    <Pagination postsPerPage={postsPerPage} totalPosts={skills.length} paginate={paginate} />
                    </div> 
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
        <Modal show={show}>
                    <Modal.Header>Ajouter un score


                    </Modal.Header>
                    <Modal.Body>
                    <div class="container">
    <form onSubmit={handleSubmit} >

<div class="form-group">
    <label for="score">Score</label>
    <input type="text" class="form-control" onChange={handleChange}  id="score" name="score"/>

  </div>
  
  <button type="submit" class="btn btn-default" >Add score</button>
  


  </form>

</div>
                    </Modal.Body>
            <Modal.Footer>
            <Link to={`/listHard/`}>     <Button onClick={closeModal}> Close Modal</Button></Link></Modal.Footer>
              
                </Modal>

     {/* <div class="content-block">

<div className="container-fluid mt--7" id="about">
               <h1 className="text-center py-4">Welcome to imProve</h1>
            <Link to="/addhard"><Button>Add hard Skills +</Button></Link>  
              <div className="row text-center mt-5">
          
          {   skills.map( skill =>(         
                <div className="col-md-3" style={{marginBottom:'20px'}} key={skill._id}>
                 <div className="card shadow">
                  <div className="card-body">
                  <div className="py-3 text-center"> 
                  <div style={{minHeight: '140px' ,backgroundImage: 'url(https://theyellowspot.com/wp-content/uploads/2019/10/soft-skills-1.png)', backgroundSize: 'cover', backgroundPosition: 'center top'}}/>
                 </div>
                  <div className="card-body">
                    <h4 className="card-title">{skill.type}  : {skill.title}</h4>
                    <p className="card-text">{skill.categorie} </p>

                  
                    <p className="card-text">{skill.description} </p>

                    </div>
                  </div>
                  <Link to={`/listHard/${skill._id}`}>
                    
                     <Button className="btn bg-gradient-primary" onClick={handleModal}>score</Button>
                   

                    
             </Link>
                <Modal show={show}>
                    <Modal.Header>Ajouter un score


                    </Modal.Header>
                    <Modal.Body>
                    <div class="container">
    <form onSubmit={handleSubmit} >

<div class="form-group">
    <label for="score">Score :</label>
    <input type="text" class="form-control" onChange={handleChange}  id="score" name="score"/>

  </div>
  
  <button type="submit" class="btn btn-default">Add score</button>
  


  </form>

</div>
                    </Modal.Body>
            <Modal.Footer>
            <Link to={`/listHard/`}>     <Button onClick={closeModal}> Close Modal</Button></Link></Modal.Footer>
              
                </Modal>
                
                

                </div>
                </div>
           ) )}
              </div>
            </div>
       </div>*/}
<Footer/>


        </>
    )
}

