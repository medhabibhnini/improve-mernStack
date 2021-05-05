import React,{useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import axios from 'axios'
import { Button ,Modal} from 'react-bootstrap';
import { isEmpty } from "../../components/utils/validation/Validation";
import Swal from 'sweetalert2'
import Pagination from '../../components/body/profile/Pagination'

import {Link} from 'react-router-dom'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'

const initialScore ={
  UserId:'',
  score :'',
  err: '',
  success: ''
 
     }
export default function ListSoft  (){
  const [skills,getSkills] =useState([]);
  const {id} = useParams()
  const  [show,setShow] =useState(false);
  const auth = useSelector(state => state.auth)

  const {user, isLogged, isAdmin} = auth

  const [datas ,setDatas]= useState(initialScore);
 const {UserId,score,err,success}=datas;
  useEffect(()=>{
    getAllSkills();},[]);
    const getAllSkills =()=>{
    axios.get('http://localhost:5000/soft/getmicroskills')
    .then((response)=>{
    const allSkills =response.data;
    getSkills(allSkills);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = skills.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    

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
          const res =  axios.post(`http://localhost:5000/soft/affecterSoft/${id}`,{
            score,UserId
          })
       //   setData({...data,err:'',success:res.data.msg})
       //setDatas({...datas,err:'',success:res.data.msg})
      closeModal()
        }
      })
      } catch(err)
      {
        err.response.data.msg && 
        setDatas({...datas, err: err.response.data.msg, success: ''})
        Swal.fire(
          'Error!',
          'Error.',
          'error'
        )
      }
    
      
          }
  
          const handleChange = e => {
            const {name, value} = e.target
            datas.UserId=user._id;
    
            setDatas({...datas, [name]:value, err:'', success: ''})
          }

          const handleModal =()=>
          { 
      
            
              setShow(true);
          }
          const closeModal =()=>
          {
              setShow(false);
          }

  
  return (
        <>
            <Header/>
           {/* <br></br>
    <br></br>
    <br></br>
    <br></br>
<div  className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px' ,backgroundImage: 'url(https://www.eleapsoftware.com/wp-content/uploads/2018/02/education-and-business-background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
<span className="mask bg-gradient-default opacity-8"></span>
<h1 class="titre" style={{marginLeft:"500px",fontSize:"100",color:"white"}}>imProve your skills </h1>
<div class="overlay"></div>
<div className="container-fluid d-flex align-items-center">
  <div className="row">
    <div className="col-lg-7 col-md-10">
    </div>
  </div>
</div>
</div>



<div className="container mt-5" id="about">
               <h1 className="text-center py-4">Welcome to imProve</h1>
              
              <div className="row text-center mt-5">
          
          {   skills.map( skill =>(         
                <div className="col-md-3" style={{marginBottom:'20px'}}>
                 <div className="card shadow">
                  <div className="card-body">
                  <div className="py-3 text-center"> 
                  <div style={{minHeight: '140px' ,backgroundImage: 'url(https://theyellowspot.com/wp-content/uploads/2019/10/soft-skills-1.png)', backgroundSize: 'cover', backgroundPosition: 'center top'}}/>
                 </div>
                  <div className="card-body">
                  {skill.macroId.map(macro=>(
                      <h3 key={macro._id}>{macro.title}</h3>
                      ))}
                    <h4 className="card-title">{skill.title}</h4>
                    <p className="card-text">{skill.description} </p>
                    </div>
                  </div>
  <Link to={`/detailsoft/${skill._id}`}> <Button className="btn bg-gradient-primary"> More details</Button></Link>
              
  <Link to={`/listsoft/${skill._id}`}> <Button className="btn bg-gradient-primary" onClick={handleModal}> Score</Button></Link>
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
            <Link to={`/listsoft/`}>  <Button onClick={closeModal}> Close Modal</Button></Link></Modal.Footer>
              
                </Modal>
                
                </div>
                </div>
           ) )}
              </div>
            </div>
                  */  }

<div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
          <div class="container">
              <div class="page-banner-entry">
                  <h1 class="text-white">Soft skills</h1>
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
											<img src={skill.image} alt=""/>
									 <Link  to={`/listsoft/${skill._id}`}>
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



							</div>
              <div style={{marginLeft:"500px"}}>
                    <Pagination postsPerPage={postsPerPage} totalPosts={skills.length} paginate={paginate} />
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
            <Link to={`/listsoft/`}>     <Button onClick={closeModal}> Close Modal</Button></Link></Modal.Footer>
              
                </Modal>
<Footer/>


        </>
    )
}

