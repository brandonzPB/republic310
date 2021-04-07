import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import * as userServices from '../../../services/userServices';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import './paymentForm.css';

const PaymentForm: React.FC = () => {
  const { cart, user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const [success, setSuccess] = useState(false);

  const stripe: any = useStripe();

  const elements: any = useElements();

  /// CSS 15:55 ///

  if (cart.totalItemCount === 0 || cart.products.length === 0) {
    changeDest('home');
  }

  if (dest === 'home') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'confirmation') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/checkout/confirmation" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/checkout/payment">
        <Redirect to="/about" />
      </Route>
    )
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const {id} = paymentMethod;
        const amount: number = 100;

        const paymentObj = { id, amount };

        const userId: string = user._id!;
        const accessToken: string = user.accessToken!;
    
        const response: any = await userServices.postPayment(userId, paymentObj, accessToken);
    
        if (response.success) {
          console.log('Successful payment');
          setSuccess(true);
        }
        
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      console.log('Error: ', error);
    }
  }

  return (
    <div id="payment-info__container">
      <>
        {
          !success
            ? <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                  <div className="FormRow">
                    <CardElement id="card-element" />
                  </div>
                </fieldset>
                <button id="pay-btn">Pay</button>
              </form>
            : <div id="payment-success__container">
                <span id="payment-text">We hope you enjoy your purchase!</span>
              </div>

        }
      </>
    </div>
  )
}

export default PaymentForm;
