import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
import './register.css'


const initialState = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, lastName, userName, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, lastName, userName, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    
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
                
                  <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                      <small>Please fill all the blanks</small>
                    </div>
                    {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <form role="form" onSubmit={handleSubmit}>
                   
                      
             	 
                        
                    <div class="form-group mb-3">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-hat-3"></i></span>
                        </div>
                        <input class="form-control" placeholder="name" type="name" id="name"
                      value={name} name="name" onChange={handleChangeInput} />
                      </div>
                    </div>

                    
                    <div class="form-group mb-3">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-hat-3"></i></span>
                        </div>
                        <input class="form-control" placeholder="lastName" type="lastName" id="lastName"
                      value={lastName} name="lastName" onChange={handleChangeInput} />
                      </div>
                    </div>

                    <div class="form-group mb-3">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-hat-3"></i></span>
                        </div>
                        <input class="form-control" placeholder="userName" type="userName" id="userName"
                      value={userName} name="userName" onChange={handleChangeInput} />
                      </div>
                    </div>



                    <div class="form-group mb-3">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                        </div>
                        <input class="form-control" placeholder="Email" type="email" id="email"
                      value={email} name="email" onChange={handleChangeInput} />
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

                    <div class="form-group mb-3">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input class="form-control" placeholder="Confirm Password" type="password" id="cf_password"
                      value={cf_password} name="cf_password" onChange={handleChangeInput} />
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
                      <div class="text-center">
                        <button type="submit" class="btn btn-info mt-4">Create account</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row mt-3">
                
                <div class="col-12 text-right">
                <Link to="/login">  <a href="#" class="text-light"><small>You already have an account?</small></a></Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
  
       
      </body>
      )

    
}

export default Register
