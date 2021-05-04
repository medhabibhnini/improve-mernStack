
import React , { useState }  from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Softskill from "../../../views/skills/ListSoftSkills"
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'

import "../../../admin/assets/css/assets.css"
import "../../../admin/assets/vendors/calendar/fullcalendar.css"
import "../../../admin/assets/css/typography.css"
import "../../../admin/assets/css/shortcodes/shortcodes.css"
import "../../../admin/assets/css/style.css"
import "../../../admin/assets/css/dashboard.css"
import "../../../admin/assets/css/color/color-1.css"

import {  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media ,Nav,NavItem, NavLink } from  "reactstrap";



function Dashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const [isClosed,setIsClosed]= useState(false);   

  const toggle1 = () => setIsOpen(!isOpen);
  
    const auth = useSelector(state => state.auth)

    const {user, isLogged, isAdmin} = auth


    const handleLogout = async () => {
      
        try {
          swal({
            title: "Logout Bouton",
            text: "You are going to Logout",
            icon: "warning",
            buttons: "Confirm",
            timer: "9000"
            });
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }
    

    return (
        <>
 <body class="ttr-opened-sidebar ttr-pinned-sidebar">
 <header class="ttr-header">
		<div class="ttr-header-wrapper">

			<div class="ttr-toggle-sidebar ttr-material-button">
				<i class="ti-close ttr-open-icon"></i>
				<i class="ti-menu ttr-close-icon"></i>
			</div>

			<div class="ttr-logo-box">
				<div>
					<a href="index.html" class="ttr-logo">
						<img class="ttr-logo-mobile" alt="" src="assets/images/logo-mobile.png" width="30" height="30"/>
						<img class="ttr-logo-desktop" alt="" src="assets/images/logo-white.png" width="160" height="27"/>
					</a>
				</div>
			</div>

			<div class="ttr-header-menu">

				<ul class="ttr-header-navigation">
					<li>
						<Link to="/" class="ttr-material-button ttr-submenu-toggle">HOME</Link>
					</li>
			
				</ul>
	
			</div>
			<div class="ttr-header-right ttr-with-seperator">

				<ul class="ttr-header-navigation">
					<li>
						<a href="#" class="ttr-material-button ttr-search-toggle"><i class="fa fa-search"></i></a>
					</li>
					<li>
						<a href="#" class="ttr-material-button ttr-submenu-toggle"><i class="fa fa-bell"></i></a>
						<div class="ttr-header-submenu noti-menu">
							<div class="ttr-notify-header">
								<span class="ttr-notify-text-top">9 New</span>
								<span class="ttr-notify-text">User Notifications</span>
							</div>
							<div class="noti-box-list">
								<ul>
									<li>
										<span class="notification-icon dashbg-gray">
											<i class="fa fa-check"></i>
										</span>
										<span class="notification-text">
											<span>Sneha Jogi</span> sent you a message.
										</span>
										<span class="notification-time">
											<a href="#" class="fa fa-close"></a>
											<span> 02:14</span>
										</span>
									</li>
									<li>
										<span class="notification-icon dashbg-yellow">
											<i class="fa fa-shopping-cart"></i>
										</span>
										<span class="notification-text">
											<a href="#">Your order is placed</a> sent you a message.
										</span>
										<span class="notification-time">
											<a href="#" class="fa fa-close"></a>
											<span> 7 Min</span>
										</span>
									</li>
									<li>
										<span class="notification-icon dashbg-red">
											<i class="fa fa-bullhorn"></i>
										</span>
										<span class="notification-text">
											<span>Your item is shipped</span> sent you a message.
										</span>
										<span class="notification-time">
											<a href="#" class="fa fa-close"></a>
											<span> 2 May</span>
										</span>
									</li>
									<li>
										<span class="notification-icon dashbg-green">
											<i class="fa fa-comments-o"></i>
										</span>
										<span class="notification-text">
											<a href="#">Sneha Jogi</a> sent you a message.
										</span>
										<span class="notification-time">
											<a href="#" class="fa fa-close"></a>
											<span> 14 July</span>
										</span>
									</li>
									<li>
										<span class="notification-icon dashbg-primary">
											<i class="fa fa-file-word-o"></i>
										</span>
										<span class="notification-text">
											<span>Sneha Jogi</span> sent you a message.
										</span>
										<span class="notification-time">
											<a href="#" class="fa fa-close"></a>
											<span> 15 Min</span>
										</span>
									</li>
								</ul>
							</div>
						</div>
					</li>
			
        <UncontrolledDropdown nav>
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
          <DropdownItem to="/profile" tag={Link}>
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          <DropdownItem to="/radar" tag={Link}>
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
       
					<li class="ttr-hide-on-mobile">
						
					</li>
				</ul>

			</div>

			<div class="ttr-search-bar">
				<form class="ttr-search-form">
					<div class="ttr-search-input-wrapper">
						<input type="text" name="qq" placeholder="search something..." class="ttr-search-input"/>
						<button type="submit" name="search" class="ttr-search-submit"><i class="ti-arrow-right"></i></button>
					</div>
					<span class="ttr-search-close ttr-search-toggle">
						<i class="ti-close"></i>
					</span>
				</form>
			</div>

		</div>
	</header>
	<div class="ttr-sidebar">
		<div class="ttr-sidebar-wrapper content-scroll">

			<div class="ttr-sidebar-logo">
				<a href="#"><img alt="" src="assets/images/logo.png" width="122" height="27"/></a>
			 <div class="ttr-sidebar-pin-button" title="Pin/Unpin Menu">
					<i class="material-icons ttr-fixed-icon"></i>
					<i class="material-icons ttr-not-fixed-icon"></i>
				</div> 
				<div class="ttr-sidebar-toggle-button">
					<i class="ti-arrow-left"></i>
				</div>
			</div>

			<nav class="ttr-sidebar-navi">
				<ul>
					<li>
						<Link  to="/homeback" class="ttr-material-button">
							<span class="ttr-icon"><i class="ti-home"></i></span>
		                	<span class="ttr-label">Dashborad</span>
		                </Link>
		            </li>
					<li>
						<a Link to="/users" class="ttr-material-button">
							<span class="ttr-icon"><i class="ti-home"></i></span>
		                	<span class="ttr-label">Users</span>
		                </a>
		            </li>
					<li>
						<Link to="/courses" class="ttr-material-button">
							<span class="ttr-icon"><i class="ti-book"></i></span>
		                	<span class="ttr-label">Courses</span>
		                </Link>
		            </li>
              
				
				
					<li>
						<Link to="/hardskills" class="ttr-material-button">
							<span class="ttr-icon"><i class="ti-bookmark-alt"></i></span>
		                	<span class="ttr-label">Hard Skills</span>
		                </Link>
		            </li>

	
					<li>
						<a to="/softskills" class="ttr-material-button" onClick={toggle1}>
							<span class="ttr-icon"><i class="ti-user"></i></span>
		                	<span class="ttr-label">Soft Skills</span>
		                	<span class="ttr-arrow-icon"><i class="fa fa-angle-down"></i></span>
		                </a>
                    <Collapse isOpen={isOpen}>
		                	<li>
		                		<a href="user-profile.html" class="ttr-material-button"><span class="ttr-label">Macro skills</span></a>
		                	</li>
		                	<li>
		                		<Link to="/softskills" class="ttr-material-button"><span class="ttr-label">Micro Skills</span></Link>
		                	</li>
		                </Collapse>
		            </li>


					<li>
						<Link to="/events" class="ttr-material-button">
							<span class="ttr-icon"><i class="ti-comments"></i></span>
		                	<span class="ttr-label">Events</span>
		                </Link>
		            </li>
					<li>
						<a href="add-listing.html" class="ttr-material-button">
							<span class="ttr-icon"><i class="ti-layout-accordion-list"></i></span>
		                	<span class="ttr-label">Forum</span>
		                </a>
		            </li>

					
					<li>
						<a href="#" class="ttr-material-button" onClick={toggle1}>
							<span class="ttr-icon"><i class="ti-user"></i></span>
		                	<span class="ttr-label">My Profile</span>
		                	<span class="ttr-arrow-icon"><i class="fa fa-angle-down"></i></span>
		                </a>
                    <Collapse isOpen={isOpen}>
		                	<li>
		                		<a href="user-profile.html" class="ttr-material-button"><span class="ttr-label">User Profile</span></a>
		                	</li>
		                	<li>
		                		<a href="teacher-profile.html" class="ttr-material-button"><span class="ttr-label">Teacher Profile</span></a>
		                	</li>
		                </Collapse>
		            </li>
		            <li class="ttr-seperate"></li>
				</ul>
		
			</nav>
	
		</div>
	</div>
  </body>
 
        </>
    )
}

export default Dashboard