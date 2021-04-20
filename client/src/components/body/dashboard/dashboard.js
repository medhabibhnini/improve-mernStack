import React from 'react'
import swal from 'sweetalert'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Softskill from "../../../views/skills/ListSoftSkills"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./SubMenu"
import axios from 'axios'
import "./styledash.css"
import {  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media ,Nav,NavItem, NavLink } from  "reactstrap";


import improvelogo from "../../../assets/img/logo.png"
function Dashboard() {

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
    
const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];
    return (
        <>
  
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
  <a class="navbar-brand" href="#">Sidebar Nav</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarCollapse"
    aria-controls="navbarCollapse"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="navbar-nav mr-auto sidenav" id="navAccordion">
    <Nav vertical className="list-unstyled pb-3">
    <NavItem style={{marginBottom :"30px",marginTop : "20px",marginLeft:"20px"}}>
          <NavLink tag={Link} to={"/homeback"}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
Home
          </NavLink>
        </NavItem>
       
        <NavItem style={{marginBottom :"30px",marginTop : "20px",marginLeft:"20px"}}>
          <NavLink tag={Link} to={"/users"}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            List of users
          </NavLink>
        </NavItem>
        <NavItem style={{marginBottom :"30px",marginTop : "20px",marginLeft:"20px"}}>
          <NavLink tag={Link} to={"/softskills"} >
          <FontAwesomeIcon icon={faBriefcase} className="mr-2" />

            Soft skills
          </NavLink>
        </NavItem>
        <NavItem style={{marginBottom :"30px",marginTop : "20px",marginLeft:"20px"}}>
          <NavLink tag={Link} to={"/hardskills"}>
          <FontAwesomeIcon icon={faBriefcase} className="mr-2" />

            Hard skills
          </NavLink>
        </NavItem>
        <NavItem style={{marginBottom :"30px",marginTop : "20px",marginLeft:"20px"}}>
          <NavLink tag={Link} to={"/contact"}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Courses
          </NavLink>
        </NavItem>
      </Nav>
    </ul>
    <ul class="navbar-nav ml-auto mt-2 mt-md-0">
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
          <DropdownItem to="/admin/user-profile" tag={Link}>
            <i className="ni ni-settings-gear-65" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownItem to="/admin/user-profile" tag={Link}>
            <i className="ni ni-calendar-grid-58" />
            <span>Activity</span>
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
    </ul>
  </div>
</nav>





        </>
    )
}

export default Dashboard
