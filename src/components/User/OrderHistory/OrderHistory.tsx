import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
import Order from '../Order/Order';
import './orderHistory.css';

const OrderHistory: React.FC = () => {
  const { user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'home') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'payment') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/checkout/payment" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/order_history">
        <Redirect to="/about" />
      </Route>
    )
  }

  const OrderComponents: any = user.orderHistory.map((order: interfaces.CompleteCart) => (
    <Order 
      key={order.id}
      date={order.date}
      id={order.id}
      products={order.products}
      totalItemCount={order.totalItemCount}
      subtotal={order.subtotal}
      taxes={order.taxes}
      total={order.total}
    />
  ));

  return (
    <div id="order-history__container">
      <span id="order-header">Your Orders</span>
      {OrderComponents}
    </div>
  )
}

export default OrderHistory;
