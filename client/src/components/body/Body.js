import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

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
import Posts from './posts/Posts'
import DetailPosts from './detailPosts/DetailPosts'
import CreatePost from './posts/CreatePost'
import  Softskills from  '../../views/skills/ListSoftSkills'
import Addsoftskills from '../../views/skills/Softskills'
import Editsoftskills from '../../views/skills/EditSoft'
import ListSoft from '../../views/front/ListSoft'
import DetailSoft from '../../views/front/DetailSoft'
import Hardskills from '../../views/skills/ListHardSkills'
import Addhardskills from '../../views/skills/Addhardskills'
import Edithardskills from '../../views/skills/EditHard'
import HomeBack from '../../views/Home'
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

                <Route path="/radar" component={isLogged ? Radar : NotFound} exact />
                <Route path="/posts" component={Posts} exact />
                <Route path="/posts/add" component={isLogged ? CreatePost : NotFound} exact />
                <Route path="/forum/posts/:id" component={DetailPosts} exact />
             {/*<Route path="/admin/dashboard" component={isAdmin ? Admin : NotFound} exact  />
                <Route path="/admin/user" component={isAdmin ? UserProfile : NotFound} exact  />
                <Route path="/admin/table" component={isAdmin ? table : NotFound} exact  />

                <Route path="/admin/softskills" component={isAdmin ? softskills : NotFound} exact  />
                <Route path="/admin/editskills/:id" component={isAdmin ? editSkills : NotFound} exact  />
    */}
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
