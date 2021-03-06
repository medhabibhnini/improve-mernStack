import React,{useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import axios from 'axios'
import { Button ,Modal} from 'react-bootstrap';
import {useSelector} from 'react-redux'
import { isEmpty } from "../../components/utils/validation/Validation";
import {Link} from 'react-router-dom'
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
    const notif = async e => {
      Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Click to Add Hard Skills',
          text: 'The blue button on left',
          imageUrl: 'https://i.pinimg.com/736x/61/62/5b/61625b91c47e4a58d0b1d338a8fd0596.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        },{
          title: 'Mouse Scroll on the added Skills',
          text: 'Scroll on the picture, a button will appear',
          imageUrl: 'https://i.pinimg.com/736x/61/62/5b/61625b91c47e4a58d0b1d338a8fd0596.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image'
       
        },{
          title: 'Select add Score Button',
          text: 'A PoP UP will appear , be free to add your score',
          imageUrl: 'https://i.pinimg.com/736x/61/62/5b/61625b91c47e4a58d0b1d338a8fd0596.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image'
          
        }
      ]).then((result) => {
        if (result.value) {
          const answers = JSON.stringify(result.value)
          Swal.fire({
        title: '<strong>We are here to <u>HELP YOU</u></strong>',
        icon: 'info',
        html:
          'You can use <b>HELP SECTION</b>, ' +
          'for more details, hope it was clear for you', 
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Clear!',
        confirmButtonAriaLabel: 'Great! Enjoy it!',
      })
        }
      })
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
            const res =  axios.post(`http://localhost:5000/hard/affecterHard/${id}`,{
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
								<a href="#"><img src="assets/images/adv/adv.jpg" alt=""/></a>
							</div>
							<div class="widget recent-posts-entry widget-courses">
                                <h5 class="widget-title style-1">Recent Courses</h5>
                                <div class="widget-post-bx">
                                    <div class="widget-post clearfix">
                                        <div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic1.jpg" width="200" height="143" alt=""/> </div>
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
            
            <div class="form-group">
    <input type="submit" class="form-control" value="HELP" onClick={notif} />

  </div>
  <Link to="/addhards"><Button>Add hard Skills +</Button></Link>  

							<div class="row">
              { skills.map( skill =>(   

								<div class="col-md-6 col-lg-4 col-sm-6 m-b30">
									<div class="cours-bx">
										<div class="action-box">
											<img src="assets/images/courses/pic1.jpg" alt=""/>
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
								<div class="col-lg-12 m-b20">
									<div class="pagination-bx rounded-sm gray clearfix">
										<ul class="pagination">
											<li class="previous"><a href="#"><i class="ti-arrow-left"></i> Prev</a></li>
											<li class="active"><a href="#">1</a></li>
											<li><a href="#">2</a></li>
											<li><a href="#">3</a></li>
											<li class="next"><a href="#">Next <i class="ti-arrow-right"></i></a></li>
										</ul>
									</div>
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
            <Link to={`/listHard/`}>     <Button onClick={closeModal}> Close</Button></Link></Modal.Footer>
              
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

