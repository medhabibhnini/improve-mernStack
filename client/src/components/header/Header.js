import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media } from  "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import dashboardlogo from "../assets/Dashboard.png"
import improvelogo from "../../assets/img/logo.png"
import swal from 'sweetalert'

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
    return  <li className="nav-item">
    <a className="nav-link nav-link-icon" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">
    <Link to="/homeback">
      
      <button   className="btn btn-secondary" >Dashboard</button>
      </Link>
    </a>
  </li>
  
}

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0,
        transform: isAdmin ? "translateY(-5px)" : 0
    }

    return (
     
        <div class="main-content">
        <nav class="navbar navbar-top navbar-horizontal navbar-expand-md navbar-light">
      <div class="container px-4">
     <Link to="/"> <img alt="..." src={improvelogo} width="200px"/></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-collapse-main">

        <div className="navbar-collapse-header d-md-none">
          <div className="row">
            <div className="col-6 collapse-brand">
              <a href="../index.html">
                
              </a>
            </div>
            <div className="col-6 collapse-close">
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      
        <ul className="navbar-nav ml-auto" style={transForm}>
        <li className="nav-item">
     <a className="nav-link nav-link-icon" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">
    <Link to="/subjects">
      
      <button   className="btn btn-secondary" >Forum</button>
      </Link>
    </a>
  </li>
        {
                    isAdmin 
                    ? userLinkAdmin()
         :<li className="nav-item">
            <a className="nav-link nav-link-icon"  target="_blank">
            
            </a>
          </li>
}
{
                 
         <li className="nav-item">
            <a className="nav-link nav-link-icon"  target="_blank">
            <Link to="/listsoft">
            <button   className="btn btn-primary" >Soft skills</button>
              </Link>
            </a>
          </li>
}
{
         <li className="nav-item">
            <a className="nav-link nav-link-icon"  target="_blank">
            <Link to="/login">
            <button   className="btn btn-primary" >Hard skills</button>
              </Link>
            </a>
          </li>
}
{
                 
                 <li className="nav-item" style={{marginRight:"0px"}}>
                    <a className="nav-link nav-link-icon"  target="_blank">
                    <Link to="/listevent">
                    <button   className="btn btn-primary" >Events</button>
                      </Link>
                    </a>
                  </li>
        }
{
                    
         <li className="nav-item" style={{marginRight:"400px"}}>
            <a className="nav-link nav-link-icon"  target="_blank">
            <Link to="/listcourses">
            <button   className="btn btn-primary" >Courses</button>
              </Link>
            </a>
          </li>
}

        {
                    isLogged
                    ? userLinkreg()
         : <li className="nav-item">
            <a className="nav-link nav-link-icon" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">
            <Link to="/register">
              
              <button   className="btn btn-primary" >Register</button>
              </Link>
            </a>
          </li>
}

{
                    isLogged
                    ? userLink()
         :<li className="nav-item">
            <a className="nav-link nav-link-icon"  target="_blank">
            <Link to="/login">
            <button   className="btn btn-primary" >Login</button>
              </Link>
            </a>
          </li>
}

        </ul>
      </div>
    </div>
  </nav>
 
  </div>

    )
}

export default Header
