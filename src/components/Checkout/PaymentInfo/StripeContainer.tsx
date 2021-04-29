import React from 'react';
import { Helmet } from 'react-helmet';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

import './paymentForm.css';
import './stripeContainer.css';

const PUBLIC_KEY: string = 'pk_test_51IVJoHERKIXzxW4uSgEBYG8fI3hyfrYa198NWQZRxGnJpEiikE2Z0ktyVjsaQbsbIRFLS3kt1TMxpXVIsbB3laWR00xwGfHjDW';

const stripeTestPromise: any = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  const content: string = 'Please input your payment information via Stripe\'s secure input';
  
  return (
    <>
      <Helmet>
        <title>Payment Info | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      <div id="stripe__container">
        <Elements stripe={stripeTestPromise}>
          <PaymentForm />
        </Elements>
      </div>
    </>
  )
}

export default StripeContainer;
