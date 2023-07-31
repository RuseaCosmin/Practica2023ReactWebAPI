import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Nav } from 'react-bootstrap';
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';
import UserCart from './UserCart.tsx'
function NavMenu() { 
    const [anchorEl, setAnchorEl] = React.useState (null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    function toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
    function logOut() {
        
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        // eslint-disable-next-line no-restricted-globals
        //location.reload();
        localStorage.clear();
        navigate('/', { refresh: true });   
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        
    }
 
      return (
        
/*      <header>
            <Navbar className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-dark border-bottom box-shadow mb-3" >
                <NavbarBrand className="text-light" tag={Link} to="/">Test Project</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="tra text-light" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="tra text-light" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="tra text-light" to="/fetch-data">View Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="tra text-light" to="/post-category">Add Category</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>*/
        <div>
            <Nav className="col-md-10 d-md-block bg-light ">
                  <div className="sidebar">
                      <Nav.Item>
                          <NavLink tag={Link} to="/">Home</NavLink>
                      </Nav.Item>
                      <Nav.Item>
                          <NavLink tag={Link} to="/fetch-data">Shop</NavLink>
                      </Nav.Item>
                      <button className="btn" onClick={logOut} >Log Out</button>

                      <button aria-describedby={id} onClick={handleClick} className="btn cart"><img width="50" height="50" src="data:image/png;base64,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" alt="viewCart"></img></button>

                      <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                      >
                          <UserCart items={[]} ></UserCart>
                      </Popover>
                  </div>
            </Nav>
        </div>
    );
  }

export default NavMenu