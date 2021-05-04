import React, {useState} from 'react'
import Recaptcha from 'react-google-recaptcha';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
import swal from 'sweetalert'


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
        
        return swal({
          title: "Please fill in all fields!",
          text: "You need to fill all fields to Register!",
          icon: "error",
          button: "Confirm",
          timer: "9000"
          });
                //return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
          swal({
            title: "Account created successefuly!",
            text: " Please Check your Email to activate it!",
            icon: "success",
            button: "Confirm",
            timer: "9000"
            });
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
        
<div class="page-wraper">
	<div id="loading-icon-bx"></div>
	<div class="account-form">
		<div class="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
			<a href="index.html"><img src="assets/images/logo-white-2.png" alt=""/></a>
		</div>
		<div class="account-form-inner">
			<div class="account-container">
				<div class="heading-bx left">
					<h2 class="title-head">Sign Up <span>Now</span></h2>
					<p>Login Your Account <Link to="/login">Click here</Link></p>
				</div>	
        {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
				<form class="contact-bx" onSubmit={handleSubmit}>
					<div class="row placeani">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<label>Your Name</label>
									<input  type="name" id="name"
                      value={name} name="name" onChange={handleChangeInput} type="text" required="" class="form-control"/>
								</div>
							</div>
						</div>
            <div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<label>Your lastname</label>
									<input   type="lastName" id="lastName"
                      value={lastName} name="lastName" onChange={handleChangeInput} required="" class="form-control"/>
								</div>
							</div>
						</div>
            <div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<label>Your Username</label>
									<input
                   type="userName" id="userName"
                   value={userName} name="userName" onChange={handleChangeInput}
                  required="" class="form-control"/>
								</div>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<label>Your Email Address</label>
									<input ype="email" id="email"
                      value={email} name="email" onChange={handleChangeInput} required="" class="form-control"/>
								</div>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group"> 
									<label>Your Password</label>
									<input    id="password"
                         value={password} name="password" onChange={handleChangeInput} type="password" class="form-control" required=""/>
								</div>
							</div>
						</div>
            <div class="col-lg-12">
							<div class="form-group">
								<div class="input-group"> 
									<label>Your Password</label>
									<input id="cf_password"
                      value={cf_password} name="cf_password" onChange={handleChangeInput} type="password" class="form-control" required=""/>
								</div>
							</div>
						</div>
						<div class="col-lg-12 m-b30">
							<button name="submit" type="submit" value="Submit" class="btn button-md">Sign Up</button>
						</div>
				
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
      )

    
}

export default Register
