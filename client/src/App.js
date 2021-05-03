import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'
import {DataProvider} from './GlobalState'
import Header from './components/header/Header'
import Body from './components/body/Body'
import axios from 'axios';
import Footer from './components/footer/Footer'
import Dashboard from './components/body/dashboard/dashboard'
import { BrowserRouter } from 'react-router-dom';

import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Login from './components/body/auth/Login';


function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])
  


  return (
 
  /*  <BrowserRouter>
    <Switch >
      <Route exact path="/linkedin" component={LinkedInPopUp} />
      <Route path="/" component={Login} />
    </Switch>
  </BrowserRouter>,
   <DataProvider>  */  
     <Router>
        
        <Body />
      
    </Router>



   

  );
}

export default App;
