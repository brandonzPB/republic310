import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
import './orderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  const { user } = useContext(GlobalContext);
  
  const { dest, changeDest, orderStatus, changeOrderStatus } = useContext(RouteContext);

  useEffect(() => {
    if (orderStatus === 'complete') {
      changeOrderStatus('incomplete');
    }
  }, []);

  if (dest === 'cart') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'payment') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/checkout/payment" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'home') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/" />
      </Route>
    )
  }

  const completeOrder: interfaces.CompleteCart = user.orderHistory[0];

  console.log('completeOrder', completeOrder);

  return (
    <div id="order-confirmation__container"></div>
  )
}

export default OrderConfirmation;
