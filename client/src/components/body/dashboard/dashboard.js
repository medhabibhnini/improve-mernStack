import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media } from  "reactstrap";


import improvelogo from "../../../assets/img/logo.png"
function Dashboard() {

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
    return (
        <>
  

  <body>
 
  <div class="main-content">
 
    <nav class="navbar navbar-tp navbar-expand-md navbar-dark bg-primary" id="navbar-main">
      <div class="container-fluid">
     
      <Link to="/"> <img alt="..." src={improvelogo} width="100px"/></Link>
      <ul className="navbar-nav ml-auto" >
      <li className="nav-item">
            <a className="nav-link nav-link-icon" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">
            <Link to="/users">
              
              <button   className="btn btn-primary" >Users list</button>
              </Link>
            </a>
          </li>

       </ul>
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
      </div>
    </nav>


  </div>
</body>



        </>
    )
}

export default Dashboard
