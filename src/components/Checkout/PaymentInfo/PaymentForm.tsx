import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import * as userServices from '../../../services/userServices';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import './paymentForm.css';

const PaymentForm: React.FC = () => {
  const { cart, user, completeOrder, addDateToCart } = useContext(GlobalContext);

  const { dest, changeDest, changeOrderStatus } = useContext(RouteContext);

  const [success, setSuccess] = useState(false);

  const stripe: any = useStripe();

  const elements: any = useElements();

  const handleOrderDate = (date: Date): any => {
    return addDateToCart(date);
  }

  const handleOrderCompletion = async (): Promise<any> => {
    return completeOrder(user._id, cart, user.accessToken);
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

          // add date to cart
          handleOrderDate(response.date);

          // adds order to history
          handleOrderCompletion();

          // setSuccess(true);
          // changeOrderStatus('complete');
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
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement id="card-element" />
          </div>
        </fieldset>
        <button id="pay-btn">Pay</button>
      </form>
    </div>
  )
}

export default PaymentForm;
