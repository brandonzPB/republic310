import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY: string = 'pk_test_51IVJoHERKIXzxW4uSgEBYG8fI3hyfrYa198NWQZRxGnJpEiikE2Z0ktyVjsaQbsbIRFLS3kt1TMxpXVIsbB3laWR00xwGfHjDW';

const stripeTestPromise: any = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  )
}

export default StripeContainer;
