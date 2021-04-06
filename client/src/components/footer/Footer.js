import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import './footer.css'

function Footer() {
   

  

    return (
      <footer class="bg-dark text-light py-5 mt-5">
      <div class="container">
          <div class="row">
              <div class="col-12 col-md-3">
                  <h3>Fixr</h3>
                  <small class="d-block text-muted">© 2018-2019</small>
                  <small class="text-muted">All Rights Reserved.</small>
              </div>
            
              <div class="col-12 col-md-9">
                  
                  <div class="row no-gutters">
                      <div class="col-6 col-lg-3">
                           <h5>Features</h5>
                          <ul class="list-unstyled">
                              <li>
                                  <a href="#" class="text-muted">Ready to ship</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Light weight</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted"> Responsive</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Inner Pages</a>
                              </li>
                          </ul>
                      </div>
                   
                      <div class="col-6 col-lg-3">
                          <h5>Resources</h5>
                          <ul class="list-unstyled">
                              <li>
                                  <a href="#" class="text-muted">Angular</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Java</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Camunda API</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Postman</a>
                              </li>
                          </ul>
                      </div>
             
                      <div class="col-6 col-lg-3">
                           <h5>Help</h5>
                          <ul class="list-unstyled">
                              <li>
                                  <a href="#" class="text-muted">Forum</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">FAQ</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Projects</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Site map</a>
                              </li>
                          </ul>
                      </div>
                 
                      <div class="col-6 col-lg-3">
                          <h5>About</h5>
                          <ul class="list-unstyled">
                              <li>
                                  <a href="#" class="text-muted">Team</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Privact</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Terms</a>
                              </li>
                              <li>
                                  <a href="#" class="text-muted">Investment</a>
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
