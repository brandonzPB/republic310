import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import ProgressBar from '../ProgressBar/ProgressBar';
import OrderSummary from '../OrderSummary/OrderSummary';
import StripeContainer from './StripeContainer';
import PayPalContainer from './PayPalContainer';
import './paymentContainer.css';

const PaymentContainer: React.FC = () => {
  const { cart } = useContext(GlobalContext);

  const { dest, changeDest, orderStatus } = useContext(RouteContext);

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

  return(
    <>
      {
        dest === '/checkout/payment'
          ? <div id="payment__container">
            <div id="payment-left__container">
              <ProgressBar spotlight="payment" />

              <div id="return-btns__container">
                <button id="return-to-shipping-btn" onClick={() => changeDest('/checkout/shipping')}>Return to Shipping</button>
                <button id="return-to-cart-btn" onClick={() => changeDest('/cart')}>Return to Cart</button>
              </div>

              <PayPalContainer />

              {/* <StripeContainer /> */}
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