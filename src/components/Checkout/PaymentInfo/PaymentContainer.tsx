import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import ProgressBar from '../ProgressBar/ProgressBar';
import OrderSummary from '../OrderSummary/OrderSummary';
import PaymentForm from './PaymentForm';
import './paymentContainer.css';

const PaymentContainer: React.FC = () => {
  const { cart } = useContext(GlobalContext);

  const { dest, changeDest, orderStatus } = useContext(RouteContext);

  const content = 'Secure your payment for the best organic hemp products on the market';

  if (cart.totalItemCount === 0 || cart.products.length === 0) {
    setTimeout(() => {
      if (orderStatus === 'complete') {
        // proceed to order confirmation page
        changeDest('/checkout/confirmation');
      } else if (orderStatus === 'incomplete') {
        changeDest('/');
      }
    }, 600);
  }

  return(
    <>
      <Helmet>
        <title>Secure your payment for the best organic hemp products on the market from The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>
      {
        dest === '/checkout/payment'
          ? <div id="payment__container">
            <div id="payment-left__container">
              <ProgressBar spotlight="payment" />

              <div id="return-btns__container">
                <button id="return-to-shipping-btn" onClick={() => changeDest('/checkout/shipping')}>Return to Shipping</button>
                <button id="return-to-cart-btn" onClick={() => changeDest('/cart')}>Return to Cart</button>
              </div>

              <PaymentForm />
            </div>
            
            <div id="payment-right__container">
              <OrderSummary />
            </div>
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
  );
}

export default PaymentContainer;