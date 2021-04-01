import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './paymentInfo.css';

const PaymentInfo: React.FC = () => {
  return (
    <div id="payment-info__container"></div>
  )
}

export default PaymentInfo;
