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
import Home from '../body/home/Home'
import Advancement from '../body/advancement/advancement'
import {useSelector} from 'react-redux'
import Dashboard from './dashboard/dashboard'

import Users from './profile/ListeUser'
import CreatePost from '../../views/CreatePost'
import CreateBlog from '../../views/CreateBlog'



import CreateCourse from '../../views/courses/CreateCourse'
import Courses from '../../views/courses/ListCourses'
import EditCourse from '../../views/courses/EditCourse'
import ListCourse from '../../views/front/ListCourse'
import DetailsCourse from '../../views/front/DetailCourse'

import Softskills from  '../../views/skills/ListSoftSkills'
import Addsoftskills from '../../views/skills/softskills.js'
import Editsoftskills from '../../views/skills/editSoft.js'
import ListSoft from '../../views/front/ListSoft'
import DetailSoft from '../../views/front/DetailSoft'
import Hardskills from '../../views/skills/ListHardSkills'
import Addhardskills from '../../views/skills/Addhardskills'
import Edithardskills from '../../views/skills/EditHard'
import HomeBack from '../../views/Home'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Topics from '../../views/Topics.js'
import TopicPage from "../../views/TopicPage.js";
import PostsUser from '../../views/PostsUser'
import blogs from '../../views/Blogs'
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

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
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

                <Route path="/radar" component={isLogged ? Radar : NotFound} exact />
               
                <Route path="/posts/add/:blog_id" component={isLogged ? CreatePost : NotFound} exact />
                <Route path="/subject/add" component={isLogged ? CreateBlog : NotFound} exact />  
                <Route path="/posts/user-posts" component={isLogged ? PostsUser : NotFound} exact />  
                <Route path="/topics/:blog_id" exact component={Topics} />
                <Route path="/subjects" exact component={blogs} />
                <Route path="/topics/topic/:topic_id" exact component={TopicPage} />
                { /* <Route path="/forum/posts/:id" component={DetailPosts} exact />*/}
                <Route exact path="/linkedin" component={LinkedInPopUp} />
                <Route path="/softskills" component={isAdmin ? Softskills : NotFound} exact  />
                <Route path="/addsoft" component={isAdmin ? Addsoftskills : NotFound} exact  />
                <Route path="/editsoft/:id" component={isAdmin ? Editsoftskills : NotFound} exact  />
                <Route path="/listsoft" component={ListSoft} exact />
                <Route path="/detailsoft/:id" component={DetailSoft} exact />
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
