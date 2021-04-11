import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const Contact: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'userInfo') {
    return (
      <Route exact path="/contact">
        <Redirect to="/user/info" />
      </Route>
    )
  }

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

  if (dest === 'index' || dest !== 'contact') {
    return (
      <Route exact path="/contact">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div id="contact__container"></div>
  )
}

export default Contact;
