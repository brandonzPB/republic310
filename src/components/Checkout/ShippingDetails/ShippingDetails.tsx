import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import ShippingForm from './ShippingForm';
import './shippingDetails.css';

const ShippingDetails: React.FC = () => {
  const { cart, user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  if (cart.total === 0 || cart.totalItemCount === 0) {
    changeDest('/');
  }

  return (
    <>
      {
        dest === '/checkout/shipping'
          ? <div id="shipping-details__container">
            <h1>Taxes: ${cart.taxes.toFixed(2)}</h1>
            <h1>Total: ${cart.total.toFixed(2)}</h1>
            <span id="shipping-login-text">Already have an account? Login at the top right and your shipping info will be filled in automatically</span>
      
            <ShippingForm />
          </div>
          : !dest
            ? <Route exact path="/checkout/shipping">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/checkout/shipping">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default ShippingDetails;
