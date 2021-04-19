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
import create_course from '../createCourse/CreateCourse'
import Users from './profile/ListeUser'
import CreateCourse from '../createCourse/CreateCourse'

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

                <Route path="/create_course" exact component={isAdmin ? CreateCourse : NotFound} />

                <Route path="/radar" component={isLogged ? Radar : NotFound} exact />
            </Switch>
        </section> 
    
    </>
    )
}

export default Body
