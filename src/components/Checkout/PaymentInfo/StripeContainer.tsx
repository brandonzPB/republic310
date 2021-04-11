import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { RouteContext } from '../../../contexts/RouteContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import PaymentForm from './PaymentForm';

import './paymentForm.css';
import './stripeContainer.css';

const PUBLIC_KEY: string = 'pk_test_51IVJoHERKIXzxW4uSgEBYG8fI3hyfrYa198NWQZRxGnJpEiikE2Z0ktyVjsaQbsbIRFLS3kt1TMxpXVIsbB3laWR00xwGfHjDW';

const stripeTestPromise: any = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  const { cart } = useContext(GlobalContext);

  const { dest, changeDest, orderStatus, changeOrderStatus } = useContext(RouteContext);

  if (cart.totalItemCount === 0 || cart.products.length === 0) {
    setTimeout(() => {
      if (orderStatus === 'complete') {
        // proceed to order confirmation page
        return changeDest('confirmation');
      }
  
      // order status is incomplete
      changeDest('index');
    }, 600);
  }

  if (dest === 'userInfo') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/user/info" />
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

  if (dest === 'index' || dest !== 'payment') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/" />
      </Route>
    )
  }
  
  return (
    <div id="stripe__container">
      <Elements stripe={stripeTestPromise}>
        <PaymentForm />
      </Elements>
    </div>
  )
}

export default StripeContainer;
