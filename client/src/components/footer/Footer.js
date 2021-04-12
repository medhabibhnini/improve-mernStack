import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import './footer.css'

function Footer() {
   

  

    return (
<footer className="bg-dark text-light py-5 mt-5">
<div className="container">
    <div className="row">
        <div className="col-12 col-md-3">
            <h3>Fixr</h3>
            <small className="d-block text-muted">© 2018-2019</small>
            <small className="text-muted">All Rights Reserved.</small>
        </div>
      
        <div className="col-12 col-md-9">
            
            <div className="row no-gutters">
                <div className="col-6 col-lg-3">
                     <h5>Features</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-muted">Ready to ship</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Light weight</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted"> Responsive</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Inner Pages</a>
                        </li>
                    </ul>
                </div>
             
                <div className="col-6 col-lg-3">
                    <h5>Resources</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-muted">Angular</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Java</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Camunda API</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Postman</a>
                        </li>
                    </ul>
                </div>
       
                <div className="col-6 col-lg-3">
                     <h5>Help</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-muted">Forum</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">FAQ</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Projects</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Site map</a>
                        </li>
                    </ul>
                </div>
           
                <div className="col-6 col-lg-3">
                    <h5>About</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#" className="text-muted">Team</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Privact</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Terms</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted">Investment</a>
                        </li>
                    </ul>
                </div>
               
            </div>
   
        </div>
   
    </div>

</div>

</footer>
    )
}

export default Footer
