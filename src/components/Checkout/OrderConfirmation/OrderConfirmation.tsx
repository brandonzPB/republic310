import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
import getMonthName from '../../../modules/getMonthName';
import './orderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  const { user } = useContext(GlobalContext);
  
  const { dest, changeDest, orderStatus, changeOrderStatus } = useContext(RouteContext);

  useEffect(() => {
    if (orderStatus === 'complete') {
      return changeOrderStatus('incomplete');
    }
  }, []);

  if (!user.isAuthorized) {
    changeDest('home');
  }

  if (dest === 'home') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/" />
      </Route>
    )
  }

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

  const completeOrder: interfaces.CompleteCart = user.orderHistory[0];

  console.log('completeOrder', completeOrder);
  console.log('randomId', uuidv4());

  const orderDateString: string = completeOrder.date.toString();

  const orderDate = {
    year: orderDateString.slice(0,4),
    month: getMonthName(orderDateString.slice(5, 7)),
    day: orderDateString.slice(8,10)
  };

  return (
    <div id="order-confirmation__container">
      <span id="confirmation-header">We hope you enjoy your purchase!</span>
      
      <div id="confirmation-details__container">
        <span id="confirmation-date-text">Your order was placed on {orderDate.day} {orderDate.month} {orderDate.year}</span>
        <span id="confirmation-order-number-text"></span>
      </div>
    </div>
  )
}

export default OrderConfirmation;
