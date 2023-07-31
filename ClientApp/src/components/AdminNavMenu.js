import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export class AdminNavMenu extends Component {
  static displayName = AdminNavMenu.name;
  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
    logOut() {
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        localStorage.clear();

    }
  render() {
      return (
        
      <header>
            <Navbar className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-dark border-bottom box-shadow mb-3" >
                <NavbarBrand className="text-light" tag={Link} to="/">Admin App</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="tra text-light" to="/">View Categories</NavLink>
              </NavItem>

                          <NavItem>
                                    <button className="btn bg-light" onClick={this.logOut}>Log Out</button>
                          </NavItem>

            </ul>
          </Collapse>
        </Navbar>
      </header>
      );
  }
}
