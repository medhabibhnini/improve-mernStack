import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Radar} from 'react-chartjs-2';
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import {useParams, useHistory} from 'react-router-dom'
import { Button ,Modal} from 'react-bootstrap';


import Header from '../../header/Header'
import Footer from '../../footer/Footer'

import "../../../assets/css/assets.css"

import "../../../assets/css/typography.css"
import "../../../assets/css/shortcodes/shortcodes.css"
	

import "../../../assets/css/style.css"


import "../../../assets/css/color/color-1.css"

import "../../../assets/vendors/revolution/css/layers.css"
import "../../../assets/vendors/revolution/css/settings.css"
import "../../../assets/vendors/revolution/css/navigation.css"

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    selecteduser:'',
    err: '',
    success: ''
}
const initialScore = {

  title:'',

  err: '',
  success: ''
}
function Advancement() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)
    const {id} = useParams()

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const [datas, setDatas] = useState(initialScore)

    const {name, password, cf_password,selecteduser, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const [skills,getSkills] =useState([]);
const [skillUp,getSkillUp] =useState([]);
const [scores,setScores]=useState([]);
const [softskills,getsofskills]= useState([])
const [softscore,getsoftscore]=useState([])
const [nomsoft,getnomsoft]=useState([])
const [oneuser,setoneuser]=useState(false)
const [getusers,setusers]=useState([])

const handleChanges = e => {
  const {name, value} = e.target
  setDatas({...datas, [name]:value, err:'', success: ''})
  console.log(datas.title)
}

const getSoftSkills =()=>{
  axios.get(`http://localhost:5000/soft/getSoftList/${id}`)
  .then((response)=>{
  const allSkills =response.data;

  getsofskills(allSkills);
  }).catch(error=>console.error(`Error :${error}`));
  
  
  }
  const scoresofts =()=>{
    axios.get(`http://localhost:5000/soft/getScoresoft/${id}`)
    .then((response)=>{
    const allSkills =response.data;
    
    getsoftscore(allSkills);
  
  
  }).catch(error=>console.error(`Error :${error}`));
  
  
  }

      const getAllSkills =()=>{
      axios.get(`http://localhost:5000/hard/getHardList/${id}`)
      .then((response)=>{
      const allSkills =response.data;

getSkills(allSkills);
      }).catch(error=>console.error(`Error :${error}`));
      
      
      } 

const scoreSkills =()=>{
  axios.get(`http://localhost:5000/hard/getScorehard/${id}`)
  .then((response)=>{
  const allSkills =response.data;
  
  setScores(allSkills);


}).catch(error=>console.error(`Error :${error}`));


}

      const  nomSkillss =()=>{
      axios.get(`http://localhost:5000/hard/getNamehard/${id}`)
            .then((response)=>{
            const allSkills =response.data;
            
            getSkillUp(allSkills);
      
      
          }).catch(error=>console.error(`Error :${error}`));
      
      }


      const  nomsofts =()=>{
        axios.get(`http://localhost:5000/soft/getNamesoft/${id}`)
              .then((response)=>{
              const allSkills =response.data;
              
              getnomsoft(allSkills);
        
        
            }).catch(error=>console.error(`Error :${error}`));
        
        }


      useEffect(()=>{
        getAllSkills();
        nomSkillss();
        scoreSkills();
        getSoftSkills();
        scoresofts();
        nomsofts();
        getoneUser();
        getListUser();
      },[],[],[],[],[],[],[],[]);
const returnScores=()=>{
  scoreSkills();
  const tab1=[]
  for (let index = 0, len = scores.length; index < len; ++index)
  {
tab1[index]=scores[index].score;
  }
  return tab1;

}
const returnScoressoft=()=>{
  scoresofts();
  const tab1=[]
  for (let index = 0, len = softscore.length; index < len; ++index)
  {
tab1[index]=softscore[index].score;
  }
  return tab1;

}
const tabsoft=returnScoressoft();
const tab2=returnScores()
      const returnTab=()=>
      {  nomsofts();

         const tab1=[]
        for (let index = 0, len = skillUp.length; index < len; ++index) {
          for(let i = 0, len = skillUp[index].SkillId.length; i < len; ++i)
        {
          tab1[index]=skillUp[index].SkillId[i].title
         // settabHard(skillUp[index].SkillId[i].title)

        }
        }
        return tab1 
      }
      const returnTabsoft=()=>
      {nomSkillss();

         const tab1=[]
        for (let index = 0, len = nomsoft.length; index < len; ++index) {
          for(let i = 0, len = nomsoft[index].SkillId.length; i < len; ++i)
        {
          tab1[index]=nomsoft[index].SkillId[i].title


        }
        } return tab1
      }
      const tab=returnTab()
const nomsoftss=returnTabsoft()
      const addSkill=()=>{
        var  index=0

        for ( index, tab.length; index <  tab.length; ++index) {
        
        if(tab[index]==datas.title)
        {
          tab.slice(index,1)

        }
        }

      }


/***user */
const  getListUser =()=>{
  axios.get(`http://localhost:5000/hard/users`)
        .then((response)=>{
        const allusers =response.data;
        console.log(allusers)

        setusers(allusers);
  
  
      }).catch(error=>console.error(`Error :${error}`));
  
  
  }
  const  getoneUser =()=>{
      axios.get(`http://localhost:5000/hard/users/${id}`)
            .then((response)=>{
            const usersss =response.data;
            
            setoneuser(usersss);
      
      
          }).catch(error=>console.error(`Error :${error}`));
      
      }
   

    const datachart = {
        labels:['angularjs','react ','testqq'],
        datasets: [
          {
            label: 'Hard Skills Data',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: ['60','70','80']
          },
          
          
        ]
      };
      const datachartHard = {
        labels: ['public speaking','test','coaching'],
        datasets: [
          {
            label: 'Soft Skills Data',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(0,191,255)',
            pointBackgroundColor: 'rgba(0,191,255)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0,191,255)',
            data: ['30','70','90']
          },
          
          
        ]
      };
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

            setLoading(true)
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
        if(name || avatar ) updateInfor()
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
      <Header/>
    <br></br>
    <br></br>
    <br></br>
  
       
    <div class="content-block">
     
     <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
          <div class="container">
              <div class="page-banner-entry">
                  <h1 class="text-white">Advancement</h1>
       </div>
          </div>
      </div>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
              <br>
              </br>
              <br></br>
              <br>
              </br>
      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div class="card card-profile shadow">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <a href="#">
                      <img src={avatar ? avatar : user.avatar} class="rounded-circle"/>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div class="d-flex justify-content-between">
      
                </div>
              </div>
              <div class="card-body pt-0 pt-md-4">
                <div class="row">
                  <div class="col">
                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                      
                      </div>
                      <div>
                       
                      </div>
                      <div>
                     
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <h3>
                  {user.name} {user.lastName}<span class="font-weight-light"></span>
                  </h3>
                  <div class="h5 font-weight-300">
                  
                  </div>
                  <div class="h5 mt-4">
                    <i class="ni business_briefcase-24 mr-2"></i>{user.email}
                  </div>
                  <div>
                    <i class="ni education_hat mr-2"></i>University of Computer Science
                  </div>
         
                        
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8 order-xl-1">
            <div class="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My Hard skills Advancement</h3>
                  </div>
                  <form >   
                 {/* <select name="title" onChange={handleChanges}>
                    { tab.map( skill=>(
<option value={skill}>
{skill}

</option>
                     ) )}
                    </select>*/}<select  name="selecteduser" onChange={handleChange}
         >

         { getusers.map(users=>(
          <option value={users._id} key={users._id}>{users.name}</option>))
          
          
          }
      </select>
      
      
        <Link  to={`/Superposition/${selecteduser}`} >loop</Link>


</form>
                </div>
              </div>
       
              <div class="card-body" style={{backgroundColor:"white",borderStyle:"none"}}>
            {success && showSuccessMsg(success)}
              {err && showErrMsg(err)}
            {loading && <h3>Loading.....</h3>}
            <div>
        <Radar data ={datachart}></Radar>
        </div>
        <hr></hr>
        <h3 class="mb-0">My Soft skills Advancement</h3>

        <div>
        <Radar data ={datachartHard}></Radar>
        </div>

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
 <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
 <Footer/>
        </>
    
    )
}

export default Advancement
