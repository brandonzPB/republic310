import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import ShippingForm from './ShippingForm';
import './shippingDetails.css';

const ShippingDetails: React.FC = () => {
  const { cart, user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  if (cart.total === 0 || cart.totalItemCount === 0) {
    changeDest('index');
  }

  if (dest === 'userInfo') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/user/info" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/cart" />
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

  if (dest === 'index' || dest !== 'shipping') {
    return (
      <Route exact path="/checkout/shipping">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div id="shipping-details__container">
      <h1>Taxes: ${cart.taxes.toFixed(2)}</h1>
      <h1>Total: ${cart.total.toFixed(2)}</h1>
      <span id="shipping-login-text">Already have an account? Login at the top right and your shipping info will be filled in automatically</span>

      <ShippingForm />
    </div>
  )
}

export default ShippingDetails;
