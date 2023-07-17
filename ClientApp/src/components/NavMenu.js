import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Nav } from 'react-bootstrap';
export class NavMenu extends Component {
  static displayName = NavMenu.name;

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

  render() {
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
            <Nav className="col-md-10 d-md-block bg-light sidebar">
                  <div className="sidebar-sticky">
                      <Nav.Item>
                          <NavLink tag={Link} to="/">Home</NavLink>
                      </Nav.Item>
                      <Nav.Item>
                          <NavLink tag={Link} to="/fetch-data">Get Categories</NavLink>
                      </Nav.Item>
                      <Nav.Item>
                          <NavLink tag={Link} to="/post-category">Add Category</NavLink>
                      </Nav.Item>
                  </div>
            </Nav>
        </div>
    );
  }
}
