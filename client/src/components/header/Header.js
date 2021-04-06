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
function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged, isAdmin} = auth


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
    return  <UncontrolledDropdown nav>
    <DropdownToggle className="pr-0" nav>
      <Media className="align-items-center">
        <span className="avatar avatar-sm rounded-circle">
          <img
            alt="..."
            src={dashboardlogo}
          />
        </span>
        <Media className="ml-2 d-none d-lg-block">
          <span className="mb-0 text-sm font-weight-bold">
          Dashboard
          </span>
        </Media>
      </Media>
    </DropdownToggle>
    
  </UncontrolledDropdown>
}

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0,
        transform: isAdmin ? "translateY(-5px)" : 0
    }

    return (
      
      <div className="main-content">
      <nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-light">
    <div className="container px-4">
      <Link className="navbar-brand" to="/" target="_blank">
        Improve
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar-collapse-main">

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
        {
                    isAdmin 
                    ? userLinkAdmin()
         :<li className="nav-item">
            <a className="nav-link nav-link-icon"  target="_blank">
            
            </a>
          </li>
}
        {
                    isLogged
                    ? userLinkreg()
         : <li className="nav-item">
            <a className="nav-link nav-link-icon" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">
            <Link to="/register">
              <i className="ni ni-circle-08"></i>
              <span className="nav-link-inner--text">Register</span>
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
              <i className="ni ni-key-25"></i>
              <span className="nav-link-inner--text">Login</span>
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
