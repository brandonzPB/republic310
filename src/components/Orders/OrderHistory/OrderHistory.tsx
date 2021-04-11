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
  
  if (dest === 'userInfo') {
    return (
      <Route exact path="/order/history">
        <Redirect to="/user/info" />
      </Route>
    )
  }

  if (dest === 'orderCancel') {
    return (
      <Route exact path="/order/history">
        <Redirect to="/order/cancel" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/order/history">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/order/history">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/order/history">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/order/history">
        <Redirect to="/about" />
      </Route>
    )
  }
  if (dest === 'home' || dest !== 'orderHistory') {
    return (
      <Route exact path="/order/history">
        <Redirect to="/" />
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
