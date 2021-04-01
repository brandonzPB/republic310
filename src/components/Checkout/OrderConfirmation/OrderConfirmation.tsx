import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './orderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  return (
    <div id="order-confirmation__container"></div>
  )
}

export default OrderConfirmation;
