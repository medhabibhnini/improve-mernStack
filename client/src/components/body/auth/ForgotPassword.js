import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import { Link } from '@material-ui/core'
const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid emails.', success: ''})
            
        try {
            const res = await axios.post('/user/forgot', {email})

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }
    }
    
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
					<h2 class="title-head">Forget <span>Password</span></h2>
					<p>Login Your Account <Link href="/login">Click here</Link></p>
				</div>	
        {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
				<form class="contact-bx">
					<div class="row placeani">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<label>Your Email Address</label>
									<input   type="email" id="email"
                      value={email} name="email" onChange={handleChangeInput} type="email" required="" class="form-control"/>
								</div>
							</div>
						</div>
						<div class="col-lg-12 m-b30">
							<button name="submit" type="button" onClick={forgotPassword} value="Submit" class="btn button-md">Submit</button>
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

export default ForgotPassword
 