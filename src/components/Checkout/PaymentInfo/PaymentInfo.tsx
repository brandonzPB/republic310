import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './paymentInfo.css';

declare const window: any;

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

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

  const createOrder = (data: any, actions: any): any => {
    console.log('data', data);
    console.log('actions', actions);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01"
          },
        },
      ],
    });
  }

  const onApprove = (data: any, actions: any): any => {
    console.log('data', data);
    console.log('actions', actions);
    
    return actions.order.capture();
  }

  return (
    <div id="payment-info__container">
      <div id="paypal__container" style={{ width: '20px' }}>
        <PayPalButton
          createOrder={(data: any, actions: any) => createOrder(data, actions)}
          onApprove={(data: any, actions: any) => onApprove(data, actions)}
        />
      </div>
    </div>
  )
}

export default PaymentInfo;
