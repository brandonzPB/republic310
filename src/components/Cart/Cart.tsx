import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import './cart.css';

const Cart: React.FC = () => {
  const { dest, changeDest, product } = useContext(RouteContext);

  if (dest === 'home') {
    return (
      <Route exact path="/cart">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/cart">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/cart">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/cart">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/cart">
        <Redirect to="/productDetails" />
      </Route>
    )
  }

  if (dest === 'checkout') {
    return (
      <Route exact path="/cart">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }
  
  return (
    <div id="cart__container"></div>
  )
}

export default Cart;
