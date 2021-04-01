import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import './cart.css';

const Cart: React.FC = () => {
  const { dest, changeDest, product } = useContext(RouteContext);
  
  return (
    <div id="cart__container"></div>
  )
}

export default Cart;
