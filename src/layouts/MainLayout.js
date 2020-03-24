import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
} from 'reactstrap';
import cart from 'assets/images/cart.png';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar className="bottom-border" color="light" light expand="md">
        <NavbarBrand href="/">Xivis e-Commerce</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavbarText className="ml-auto">
            <Link to="/cart">
              <img src={cart} width="30" alt="cart" />
            </Link>
          </NavbarText>
        </Collapse>
      </Navbar>
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
