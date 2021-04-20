import React, {useState} from 'react'
import Recaptcha from 'react-google-recaptcha';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './login.css'



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
    
   /*verifyCallback(response) => {
      if (response) {
        this.setState({
          isVerified: true
        })
      }
      else 
      return "check your captcha"
    }*/
    

    return (
      <body class="bg-default">
      <div class="main-content">
    
        <div class="header bg-primary py-7 py-lg-8">
          <div class="container">
            <div class="header-body text-center mb-7">
              <div class="row justify-content-center">
                <div class="col-lg-5 col-md-6">
                  <h1 class="text-white">Welcome!</h1>
                  <p class="text-lead text-light">Use these awesome forms to login or create new account in your project for free.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="separator separator-bottom separator-skew zindex-100">
            <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>
 
        <div class="container mt--8 pb-5">
     
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8">
              <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                  <div class="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
                  <div class="text-center">
                  <GoogleLogin
                    clientId="892015450442-lc9bne9gbtddtc8njmf34n7clsrcj23n.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <hr></hr>
                <FacebookLogin
                buttonStyle={{fontSize:"10.6px"}}
                
                 appId="619161739039869"
                 autoLoad={false}
                 fields="name,email,picture"
                 callback={responseFacebook} 
                 />

                  </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                  <div class="text-center text-muted mb-4">
                    <small>Or sign up with credentials</small>
                  </div>
                  {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
                  <form role="form" onSubmit={handleSubmit}>
                 
                    <div class="form-group">
                      <div class="input-group input-group-alternative mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                        </div>
                        <input class="form-control" placeholder="Email" type="email" id="email"
                    value={email} name="email" onChange={handleChangeInput}/>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input class="form-control" placeholder="Password" type="password"
                       id="password"
                       value={password} name="password" onChange={handleChangeInput}/>
                      </div>
                    </div>
                  
                    <div class="row my-4">
                      <div class="col-12">
                        <div class="custom-control custom-control-alternative custom-checkbox">
                          <input class="custom-control-input" id="customCheckRegister" type="checkbox"/>
                          <label class="custom-control-label" for="customCheckRegister">
                            <span class="text-muted">Remember me</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                <Recaptcha
            sitekey="6Lf1V7AaAAAAAPp_6vsd_qBGMh4LcteRsSVi7Ari"
            render="explicit"
           // onloadCallback={this.recaptchaLoaded}
           // verifyCallback={this.verifyCallback}
          />
                </div>
                    <div class="text-center">
                      <button type="submit" class="btn btn-info mt-4">Create account</button>
                    </div>
                  </form>

                </div>
                
              </div>
              <div class="row mt-3">
              <div class="col-6"><Link to="/forgot_password">
                <a href="#" class="text-light"><small>Forgot your password?</small></a></Link>
              </div>
              <div class="col-6 text-right">
              <Link to="/register">  <a href="#" class="text-light"><small>Create new account</small></a></Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

     
    </body>
    )
}

export default Login
