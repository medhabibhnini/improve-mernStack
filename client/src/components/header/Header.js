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
function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
            <img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
      
        <div class="main-content">
        <nav class="navbar navbar-top navbar-horizontal navbar-expand-md navbar-light">
      <div class="container px-4">
        <a class="navbar-brand" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">
          Improve
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-collapse-main">

          <div class="navbar-collapse-header d-md-none">
            <div class="row">
              <div class="col-6 collapse-brand">
                <a href="../index.html">
                  Argon
                </a>
              </div>
              <div class="col-6 collapse-close">
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        
          <ul class="navbar-nav ml-auto" style={transForm}>
          
            <li class="nav-item">
              <a class="nav-link nav-link-icon" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">
              <Link to="/register">
                <i class="ni ni-circle-08"></i>
                <span class="nav-link-inner--text">Register</span>
                </Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link nav-link-icon"  target="_blank">
              <Link to="/login">
                <i class="ni ni-key-25"></i>
                <span class="nav-link-inner--text">Login</span>
                </Link>
              </a>
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
                    {user.name} {user.lastName}
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
      </div>
    </nav>
   
    </div>
  
    
    )
}

export default Header
