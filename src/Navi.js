import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default class Navi extends React.Component { //export public demek.Navi bir compenent

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color='light' light expand="md">
          <NavbarBrand href='="/'>NorthwindApp</NavbarBrand>
          <NavbarToggler onClick={this.toggle}></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>

            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink><Link to="/form1" >Form Demo 1</Link> </NavLink>
              </NavItem>

              <NavItem>
                <NavLink><Link to="/form2" >Form Demo 2</Link> </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Components</NavLink>
              </NavItem>

              <CartSummary removeFromCart={this.props.removeFromCart} cart={this.props.cart} />
            </Nav>
          </Collapse>

        </Navbar>
      </div>
    )
  }
}
