/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Badge,
} from 'reactstrap';
import { notify } from 'react-notify-toast';
import cart from 'assets/images/cart.png';
import { useSelector } from 'react-redux';
import { productsOnCartSelector, errorMessageSelector } from 'store/selectors/shop';
import { Link } from 'react-router-dom';
import logo from 'assets/images/xivis-logo.png';

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const productsOnCart = useSelector((state) => productsOnCartSelector(state));
  const errorMessage = useSelector((state) => errorMessageSelector(state));
  // eslint-disable-next-line no-param-reassign
  const totalItems = productsOnCart.reduce((total, product) => total += product.quantity, 0);

  useEffect(() => {
    if (errorMessage) {
      notify.show(errorMessage, 'error');
    }
  }, [errorMessage]);
  return (
    <div>
      <Navbar className="bottom-border" color="light" light expand="md">
        <NavbarBrand href="/"><img width="30" src={logo} alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavbarText className="ml-auto">
            <Link to="/cart">
              <img src={cart} width="30" alt="cart" />
              { productsOnCart.length > 0 && <Badge className="cart-notification" color="danger">{totalItems}</Badge>}
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
