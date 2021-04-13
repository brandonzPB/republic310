import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { RouteContext } from '../../../contexts/RouteContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import PaymentForm from './PaymentForm';

import './paymentForm.css';
import './stripeContainer.css';

const PUBLIC_KEY: string = 'pk_test_51IVJoHERKIXzxW4uSgEBYG8fI3hyfrYa198NWQZRxGnJpEiikE2Z0ktyVjsaQbsbIRFLS3kt1TMxpXVIsbB3laWR00xwGfHjDW';

const stripeTestPromise: any = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  const { cart } = useContext(GlobalContext);

  const { dest, changeDest, orderStatus, changeOrderStatus } = useContext(RouteContext);

  if (cart.totalItemCount === 0 || cart.products.length === 0) {
    setTimeout(() => {
      if (orderStatus === 'complete') {
        // proceed to order confirmation page
        return changeDest('/checkout/confirmation');
      }
  
      // order status is incomplete
      changeDest('/');
    }, 600);
  }
  
  return (
    <>
      {
        dest === '/checkout/payment'
          ? <div id="stripe__container">
            <Elements stripe={stripeTestPromise}>
              <PaymentForm />
            </Elements>
          </div>
          : !dest
            ? <Route exact path="/checkout/payment">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/checkout/payment">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default StripeContainer;
