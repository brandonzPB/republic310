import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './paymentInfo.css';

const PaymentInfo: React.FC = () => {
  const { cart } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'cart') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'confirmation') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/checkout/confirmation" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'home') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div id="payment-info__container">
      <div id="stripe__container"></div>
    </div>
  )
}

export default PaymentInfo;
