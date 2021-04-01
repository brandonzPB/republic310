import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './shippingDetails.css';

const ShippingDetails: React.FC = () => {
  return (
    <div id="shipping-details__container"></div>
  )
}

export default ShippingDetails;
