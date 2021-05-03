import React,{useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import axios from 'axios'
import { Button ,Modal} from 'react-bootstrap';
import { isEmpty } from "../../components/utils/validation/Validation";
import Swal from 'sweetalert2'

import "../../components/body/home/home.css"
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
    axios.get('http://localhost:5000/soft/softskills')
    .then((response)=>{
    const allSkills =response.data;
    getSkills(allSkills);
    }).catch(error=>console.error(`Error :${error}`));
    
    
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
            <br></br>
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
                    <h4 className="card-title">{skill.type}  : {skill.title}</h4>
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
       
<Footer/>


        </>
    )
}

