import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
import Order from '../../User/Order/Order';
import './orderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  const { user, emailConfirmationToUser, allProducts } = useContext(GlobalContext);
  
  const { dest, changeDest, orderStatus, changeOrderStatus } = useContext(RouteContext);

  useEffect(() => {
    if (orderStatus === 'complete') {
      const userName: string = user.firstName!;
      const email: string = user.email!;
      const accessToken: string = user.accessToken!;
      const userId: string = user._id;
      const completeOrder: interfaces.CompleteCart = user.orderHistory[0];

      emailConfirmationToUser(userName, userId, email, accessToken, completeOrder);

      return changeOrderStatus('incomplete');
    }
  }, []);

  if (!allProducts.length || !user.isAuthorized) {
    console.log('User not authorized');
    setTimeout(() => { changeDest('home') }, 700);
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

  if (!user.isAuthorized) {
    return (
      <div id="confirmation-error__container">
        <span id="confirmation-error-text">Redirecting to index...</span>
      </div>
    )
  }

  const completeOrder: interfaces.CompleteCart = user.orderHistory[0];

  return (
    <div id="order-confirmation__container">
      <Order 
        date={completeOrder.date}
        id={completeOrder.id}
        products={completeOrder.products}
        totalItemCount={completeOrder.totalItemCount}
        subtotal={completeOrder.subtotal}
        taxes={completeOrder.taxes}
        total={completeOrder.total}
      />
    </div>
  )
}

export default OrderConfirmation;
