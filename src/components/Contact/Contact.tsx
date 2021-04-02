import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const Contact: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'cart') {
    return (
      <Route exact path="/contact">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/contact">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'payment') {
    return (
      <Route exact path="/contact">
        <Redirect to="/checkout/payment" />
      </Route>
    )
  }
  
  if (dest === 'confirmation') {
    return (
      <Route exact path="/contact">
        <Redirect to="/checkout/confirmation" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/contact">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'home') {
    return (
      <Route exact path="/contact">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/contact">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/contact">
        <Redirect to="/about" />
      </Route>
    )
  }

  return (
    <div id="contact__container"></div>
  )
}

export default Contact;
