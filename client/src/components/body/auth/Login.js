import React, {useState} from 'react'
import Recaptcha from 'react-google-recaptcha';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import swal from 'sweetalert'
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'



import Header from '../../header/Header'
import Footer from '../../footer/Footer'
const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
  
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
          swal({
            title: "Verify your inputs",
            text: "Your Email & Password must match & exist!",
            icon: "error",
            button: "OK",
            timer: "9000"
            });
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    
    const responseLinkedin = async (response) => {
      try {
        const {accessToken, userID} = response
        const res = await axios.post('/user/linkedin_login', {accessToken, userID})

        setUser({...user, error:'', success: res.data.msg})
        localStorage.setItem('firstLogin', true)

        dispatch(dispatchLogin())
        history.push('/')
    } catch (err) {
        err.response.data.msg && 
        setUser({...user, err: err.response.data.msg, success: ''}) 
    }
    }

    const responseFacebook = async (response) => {
        try {
            const {accessToken, userID} = response
            const res = await axios.post('/user/facebook_login', {accessToken, userID})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''}) 
        }
    }
    
    var verifyCallback = (response) => {
      console.log(response);
      if (!response) {
          alert("captcha baby")
      }
  };
    

    return (
   <>

<div class="page-wraper">
	<div id="loading-icon-bx"></div>
	<div class="account-form">
		<div class="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
			<a href="index.html"><img src="assets/images/logo-white-2.png" alt=""/></a>
		</div>
		<div class="account-form-inner">
			<div class="account-container">
				<div class="heading-bx left">
					<h2 class="title-head">Login to your <span>Account</span></h2>
					<p>Don't have an account? <Link to="/register">Create one here</Link></p>
				</div>	
        {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
				<form class="contact-bx" onSubmit={handleSubmit}>
					<div class="row placeani">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<label>Your Name</label>
									<input value={email} name="email"  id="email" onChange={handleChangeInput}  type="text" required="" class="form-control"/>
								</div>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group"> 
									<label>Your Password</label>
									<input    value={password}  id="password" name="password" onChange={handleChangeInput} type="password" class="form-control" required=""/>
								</div>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="form-group form-forget">
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="customControlAutosizing"/>
									<label class="custom-control-label" for="customControlAutosizing">Remember me</label>
								</div>
								<Link to="/forgot_password" class="ml-auto">Forgot Password?</Link>
							</div>
						</div>
						<div class="col-lg-12 m-b30">
							<button name="submit" type="submit" value="Submit" class="btn button-md">Login</button>
						</div>
						<div class="col-lg-12">
							<h6>Login with Social media</h6>
							<div class="d-flex">
              <FacebookLogin
              buttonStyle={{ all: 'unset' }}
                 appId="619161739039869"
                 autoLoad={false}
                 textButton=""
                 fields="name,email,picture"
                 icon={<a class="btn flex-fill m-r5 facebook" href="#"><i class="fa fa-facebook"></i>Facebook</a>}
                 callback={responseFacebook} 
                 />
                <GoogleLogin
                
                render={renderProps => (
                  <a class="btn flex-fill m-l5 google-plus" onClick={renderProps.onClick} disabled={renderProps.disabled}><i class="fa fa-google-plus"></i>Google Plus</a>
                )}
                    clientId="892015450442-lc9bne9gbtddtc8njmf34n7clsrcj23n.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>




  </>
    )
}

export default Login
