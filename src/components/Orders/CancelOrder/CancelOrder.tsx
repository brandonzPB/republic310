import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './cancelOrder.css';

const CancelOrder: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'userInfo') {
    return (
      <Route exact path="/order/cancel">
        <Redirect to="/user/info" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/order/cancel">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/order/cancel">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/order/cancel">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/order/cancel">
        <Redirect to="/about" />
      </Route>
    )
  }
  if (dest === 'home' || dest !== 'orderCancel') {
    return (
      <Route exact path="/order/cancel">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div id="cancel-order__container"></div>
  )
}

export default CancelOrder;
