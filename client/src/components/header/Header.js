import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media } from  "reactstrap";
import swal from 'sweetalert'
import "../../assets/css/assets.css"

import "../../assets/css/typography.css"
import "../../assets/css/shortcodes/shortcodes.css"
	

import "../../assets/css/style.css"


import "../../assets/css/color/color-1.css"

import "../../assets/vendors/revolution/css/layers.css"
//import "../../assets/vendors/revolution/css/settings.css"
import "../../assets/vendors/revolution/css/navigation.css"

function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged, isAdmin} = auth


    const handleLogout = async () => {
      swal({
        title: "Logout Bouton",
        text: "You are going to Logout",
        icon: "warning",
        button: "Confirm",
        timer: "9000"
        });
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/login";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return    <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
               src=
               {user.avatar}
                
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
              {user.name} 
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem>
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          <DropdownItem to={`/radar/${user._id}`} tag={Link}>
            <i className="ni ni-settings-gear-65" />
            <span>My advancement</span>
          </DropdownItem>
          <DropdownItem to="/posts/user-posts" tag={Link}>
            <i className="ni ni-calendar-grid-58" />
            <span>My posts</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile" tag={Link}>
            <i className="ni ni-support-16" />
            <span>Support</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem to="/" onClick={handleLogout}>
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    }
    const userLinkreg = () => {
      return <li className="nav-item">
      <a className="nav-link nav-link-icon" href="https://www.creative-tim.com/product/argon-dashboard" hidden target="_blank">
      <Link to="/register">
        <i className="ni ni-circle-08"></i>
        <span className="nav-link-inner--text" hidden>Dashboard</span>
        </Link>
      </a>
    </li>
  }
  const userLinkAdmin = () => {
    return   <li class="nav-dashboard"><Link to="/homeback">Dashboard </Link>
                  
    </li>
  
}

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0,
        transform: isAdmin ? "translateY(-5px)" : 0
    }

    return (
     <>
     


   
      <div class="top-bar">
        <div class="container">
          <div class="row d-flex justify-content-between">
            <div class="topbar-left">
              <ul>
                <li><a href="faq-1.html"><i class="fa fa-question-circle"></i>Ask a Question</a></li>
                <li><a href="javascript:;"><i class="fa fa-envelope-o"></i>improve-stack@gmail.com</a></li>
              </ul>
            </div>
            <div class="topbar-right">
              <ul>
                <li>
                
                </li>

{
                    isLogged
                    ? userLink()
               : <li><Link to="/login">Login</Link></li>
             }
             
             {
               
               isLogged
               ? userLinkreg()
               : <li><Link to="/register">Register</Link></li>}
          
          
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky-header navbar-expand-lg">
              <div class="menu-bar clearfix">
                  <div class="container clearfix">
    
            <div class="menu-logo">
              <a href="index.html"><img src="" alt=""/></a>
            </div>

                      <button class="navbar-toggler collapsed menuicon justify-content-end" type="button" data-toggle="collapse" data-target="#menuDropdown" aria-controls="menuDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </button>

                      <div class="secondary-menu">
                          <div class="secondary-inner">
                              <ul>

                  <li><a href="javascript:;" class="btn-link"><i class="fa fa-facebook"></i></a></li>
                  <li><a href="javascript:;" class="btn-link"><i class="fa fa-google-plus"></i></a></li>
                  <li><a href="javascript:;" class="btn-link"><i class="fa fa-linkedin"></i></a></li>
                 
                  <li class="search-btn"><button id="quik-search-btn" type="button" class="btn-link"><i class="fa fa-search"></i></button></li>

                </ul>
              </div>
                      </div>
 
                      <div class="nav-search-bar">
                          <form action="#">
                              <input name="search" value="" type="text" class="form-control" placeholder="Type to search"/>
                              <span><i class="ti-search"></i></span>
                          </form>
              <span id="search-remove"><i class="ti-close"></i></span>
                      </div>
  
                      <div class="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
              <div class="menu-logo">
                <a href="index.html"><img src="assets/images/logo.png" alt=""/></a>
              </div>
                          <ul class="nav navbar-nav">	
                <li class="active"><a href="javascript:;">Home </a>
                
                </li>
                <li><a href="javascript:;">Skills <i class="fa fa-chevron-down"></i></a>
                  <ul class="sub-menu">
                 
                    <li><Link to="/listHard">Hard skills</Link>
                     
                    </li>
                      
                    <li><Link to="/listsoft">Soft skills</Link>
                     
                    </li>
                  </ul>
                </li>
                <li class="add-mega-menu"><a href="javascript:;">Our Courses <i class="fa fa-chevron-down"></i></a>
                  <ul class="sub-menu add-menu">
                    <li class="add-menu-left">
                      <h5 class="menu-adv-title">Our Courses</h5>
                      <ul>
                        <li><a href="/listcourse">Courses </a></li>
                        <li><a href="courses-details.html">Courses Details</a></li>
                        <li><a href="profile.html">Instructor Profile</a></li>
                        <li><a href="event.html">Upcoming Event</a></li>
                        <li><a href="membership.html">Membership</a></li>
                      </ul>
                    </li>
                    <li class="add-menu-right">
                      <img src="assets/images/adv/adv.jpg" alt=""/>
                    </li>
                  </ul>
                </li>
                <li><a href="javascript:;">Blog <i class="fa fa-chevron-down"></i></a>
                  <ul class="sub-menu">
                    <li><Link to="/subjects">All Subjects</Link></li>
                    <li><Link to="/subject/add">Add Subject</Link></li>
                  </ul>
                </li>
                <li><a href="javascript:;">Event <i class="fa fa-chevron-down"></i></a>
                  <ul class="sub-menu">
                    <li><a href="blog-classic-grid.html">Blog Classic</a></li>
                    <li><a href="blog-classic-sidebar.html">Blog Classic Sidebar</a></li>
                
                  </ul>
                </li>

{  isAdmin 
                    ? userLinkAdmin()
              :  <li class="nav-dashboard"><a href="javascript:;"> </a>
                  
                </li>
}




                <li><a href="javascript:;">Contact us</a>
                  <ul class="sub-menu">
                  
                  </ul>
                </li>
              </ul>
              <div class="nav-social-link">
                <a href="javascript:;"><i class="fa fa-facebook"></i></a>
                <a href="javascript:;"><i class="fa fa-google-plus"></i></a>
                <a href="javascript:;"><i class="fa fa-linkedin"></i></a>
              </div>
                      </div>
  
                  </div>
              </div>
          </div>
       
       
          </>
    )
}

export default Header