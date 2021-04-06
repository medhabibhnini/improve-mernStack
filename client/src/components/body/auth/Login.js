import React, {useState} from 'react'
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

    return (
   
      <div className="main-content">
   
      <div className="header bg-primary py-7 py-lg-8">
        <div className="container">
          <div className="header-body text-center mb-7">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6">
                <h1 className="text-white">Welcome!</h1>
                <p className="text-lead text-light">Use these awesome forms to login or create new account in your project for free.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>

      <div className="container mt--8 pb-5">
   
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card bg-secondary shadow border-0">
              <div className="card-header bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
                <div className="text-center">
                <GoogleLogin
                  clientId="892015450442-lc9bne9gbtddtc8njmf34n7clsrcj23n.apps.googleusercontent.com"
                  buttonText="Login with google"
                  onSuccess={responseGoogle}
                  cookiePolicy={'single_host_origin'}
              />
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign up with credentials</small>
                </div>
                {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
                <form role="form" onSubmit={handleSubmit}>
               
                  <div className="form-group">
                    <div className="input-group input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                      </div>
                      <input className="form-control" placeholder="Email" type="email" id="email"
                  value={email} name="email" onChange={handleChangeInput}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                      </div>
                      <input className="form-control" placeholder="Password" type="password"
                     id="password"
                     value={password} name="password" onChange={handleChangeInput}/>
                    </div>
                  </div>
                
                  <div className="row my-4">
                    <div className="col-12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" id="customCheckRegister" type="checkbox"/>
                        <label className="custom-control-label" for="customCheckRegister">
                          <span className="text-muted">Remember me</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-info mt-4">Sign In</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row mt-3">
            <div className="col-6"><Link to="/forgot_password">
              <a href="#" className="text-light"><small>Forgot your password?</small></a></Link>
            </div>
            <div className="col-6 text-right">
            <Link to="/register">  <a href="#" className="text-light"><small>Create new account</small></a></Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

     
  
    )
}

export default Login
