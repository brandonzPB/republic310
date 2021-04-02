import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './shippingDetails.css';

const ShippingDetails: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'cart') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'confirmation') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/checkout/confirmation" />
      </Route>
    )
  }

  if (dest === 'payment') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/checkout/payment" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'home') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div id="shipping-details__container"></div>
  )
}

export default ShippingDetails;
