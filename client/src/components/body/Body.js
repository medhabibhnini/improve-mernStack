import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'
import Loading from '../utils/Loading/Loading'
import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'
import Radar from '../body/advancement/advancement'
import Home from '../body/home/Home.jsx'
import Advancement from '../body/advancement/advancement'
import {useSelector} from 'react-redux'
import Dashboard from './dashboard/dashboard.jsx'

import Users from './profile/ListeUser'
import CreatePost from '../../views/CreatePost'
import CreateBlog from '../../views/CreateBlog'
import Topics from '../../views/Topics'
import TopicPage from "../../views/TopicPage";
import PostsUser from '../../views/PostsUser'
import blogs from '../../views/Blogs'


import CreateCourse from '../../views/courses/CreateCourse'
import Courses from '../../views/courses/ListCourses'
import EditCourse from '../../views/courses/EditCourse'
import ListCourse from '../../views/front/ListCourse'
import DetailsCourse from '../../views/front/DetailCourse'
import Softskills from  '../../views/skills/ListSoftSkills'
import Addsoftskills from '../../views/skills/softskills'
import Editsoftskills from '../../views/skills/editSoft'
import ListSoft from '../../views/front/ListSoft'
import DetailSoft from '../../views/front/DetailSoft'

import Events from  '../../views/events/ListEvents'
import Addevents from '../../views/events/Events'
import Editevents from '../../views/events/EditEvent'
import ListEvent from '../../views/front/ListEvent'
import calendar from '../../views/calendar/calendar'

import Hardskills from '../../views/skills/ListHardSkills'
import Addhardskills from '../../views/skills/Addhardskills'
import Addhard from '../../views/front/AjoutHard'
import Edithardskills from '../../views/skills/EditHard'
import AjoutHard from '../../views/front/AjoutHard'
import ListHard from '../../views/front/ListHard'

import HomeBack from '../../views/Home'
import Calendar from '../../views/calendar/calendar'
import DetailEvent from '../../views/front/DetailEvent'

import AddMacro from '../../views/skills/AddMacroSkill'
import AddMicro from '../../views/skills/AddMicroSkill'
import ListMacro from '../../views/skills/ListMacroSkill'
import ListMicro from '../../views/skills/ListMicroSkill'
import EditMacro from '../../views/skills/EditMacro'
import EditMicro from '../../views/skills/EditMicro'

import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Blogs from '../../views/Blogs'
function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth

    return (
        <>


        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/advancement" component={isLogged ? Advancement : NotFound} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
                <Route path="/dashboard" component={isAdmin ? Dashboard : NotFound} exact />
                 <Route path="/users" component={isAdmin ? Users : NotFound} exact />


                <Route path="/create_course" exact component={isAdmin ? CreateCourse : Loading} />
                <Route path="/courses" exact component={isAdmin ? Courses : Loading} />
                <Route path="/listcourses" exact component={isAdmin ? ListCourse : Loading} />
                <Route path="/edit_course/:id" component={isAdmin ? EditCourse : Loading} exact  />
                <Route path="/detailcourse/:id" component={DetailsCourse} exact />
                <Route path="/listcourse" exact component={isLogged ? ListCourse : Loading} />
                <Route path="/radar" component={isLogged ? Radar : NotFound} exact />

                <Route path="/posts/add" component={isLogged ? CreatePost : NotFound} exact />
             {/*<Route path="/admin/dashboard" component={isAdmin ? Admin : NotFound} exact  />
                <Route path="/admin/user" component={isAdmin ? UserProfile : NotFound} exact  />
                <Route path="/admin/table" component={isAdmin ? table : NotFound} exact  />

                <Route path="/admin/softskills" component={isAdmin ? softskills : NotFound} exact  />
                <Route path="/admin/editskills/:id" component={isAdmin ? editSkills : NotFound} exact  />
    */}

                <Route path="/radar/:id" component={isLogged ? Radar : NotFound} exact />
                
                <Route path="/posts/add" component={isLogged ? CreatePost : NotFound} exact />
                
                <Route exact path="/linkedin" component={LinkedInPopUp} />
              {/*
          <Route path="/posts" component={Posts} exact />
                <Route path="/posts/add" component={isLogged ? CreatePost : NotFound} exact />
                <Route path="/forum/posts/:id" component={DetailPosts} exact />
              <Route exact path="/linkedin" component={LinkedInPopUp} />*/}
                            <Route path="/softskills" component={isAdmin ? Softskills : NotFound} exact  />
                            <Route path="/addsoft" component={isAdmin ? Addsoftskills : NotFound} exact  />
                            <Route path="/editsoft/:id" component={isAdmin ? Editsoftskills : NotFound} exact  />
                            <Route path="/listsoft" component={ListSoft} exact />
                            <Route path="/listsoft/:id" component={ListSoft} exact />

                            <Route path="/detailsoft/:id" component={DetailSoft} exact />
                            <Route path="/hardskills" component={isAdmin ? Hardskills : NotFound} exact  />
                            <Route path="/edithard/:id" component={isAdmin ? Edithardskills : NotFound} exact  />
                            <Route path="/homeback" component={isAdmin ? HomeBack : NotFound} exact  />
                            <Route path="/listHard" component={isLogged ? ListHard : NotFound} exact />
                            <Route path="/listHard/:id" component={isLogged ? ListHard : NotFound} exact />

                            <Route path="/listmacro" component={isAdmin ? ListMacro : NotFound} exact  />
                            <Route path="/listmicro" component={isAdmin ? ListMicro : NotFound} exact  />

                            <Route path="/addmacro" component={isAdmin ? AddMacro : NotFound} exact  />

                            <Route path="/addmicro" component={isAdmin ? AddMicro : NotFound} exact  />
                            <Route path="/editmacro/:id" component={isAdmin ? EditMacro : NotFound} exact  />
                            <Route path="/editmicro/:id" component={isAdmin ? EditMicro : NotFound} exact  />
                            <Route path="/addhards" component={isLogged ? Addhard : NotFound} exact />  

                            <Route path="/posts/user-posts" component={isLogged ? PostsUser : NotFound} exact />  
                <Route path="/posts/add/:blog_id" component={isLogged ? CreatePost : NotFound} exact />
                <Route path="/subject/add" component={isLogged ? CreateBlog : NotFound} exact />  
                <Route path="/subjects" component={  Blogs || Loading } exact />  
                <Route path="/topics/:blog_id" component={Topics   } exact />  
                <Route path="/topics/topic/:topic_id" exact component={TopicPage} />
                <Route path="/404" exact component={NotFound} />
                { /* <Route path="/forum/posts/:id" component={DetailPosts} exact />*/}
              {/*  <Route exact path="/linkedin" component={LinkedInPopUp} />*/}
                {/*<Route path="/softskills" component={isAdmin ? Softskills : NotFound} exact  />
                <Route path="/addsoft" component={isAdmin ? Addsoftskills : NotFound} exact  />
    <Route path="/editsoft/:id" component={isAdmin ? Editsoftskills : NotFound} exact  />*/}
                <Route path="/listsoft" component={ListSoft} exact />
                <Route path="/detailsoft/:id" component={DetailSoft} exact />
                <Route path="/hardskills" component={isAdmin ? Hardskills : NotFound} exact  />
                <Route path="/addhard" component={isAdmin ? Addhardskills : NotFound} exact  />
                <Route path="/edithard/:id" component={isAdmin ? Edithardskills : NotFound} exact  />
                <Route path="/homeback" component={isAdmin ? HomeBack : NotFound} exact  />

              
                            <Route path="/listevent" component={ListEvent} exact />
                            <Route path="/events" component={isAdmin ? Events : NotFound} exact />  
                            <Route path="/calendar" component={calendar} exact />
                            <Route path="/addevent" component={isAdmin ? Addevents : NotFound} exact  />
                            <Route path="/editevent/:id" component={isAdmin ? Editevents : NotFound} exact  />
                            <Route path="/listsoft" component={ListSoft} exact />
                            <Route path="/detailsoft/:id" component={DetailSoft} exact />
                            <Route path="/detailevent/:id" component={DetailEvent} exact />

                            <Route path="/hardskills" component={isAdmin ? Hardskills : NotFound} exact  />
                            <Route path="/addhard" component={isAdmin ? Addhardskills : NotFound} exact  />
                            <Route path="/edithard/:id" component={isAdmin ? Edithardskills : NotFound} exact  />
                            <Route path="/homeback" component={isAdmin ? HomeBack : NotFound} exact  />

                         
            </Switch>
        </section> 
    
    </>
    )
}

export default Body
