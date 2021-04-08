import React, { useContext } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid';
import * as userServices from '../../../services/userServices';
import * as interfaces from '../../../modules/interfaces';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import './paymentForm.css';

const PaymentForm: React.FC = () => {
  const { cart, user, completeOrder, addDateToCart } = useContext(GlobalContext);

  const { changeOrderStatus } = useContext(RouteContext);

  const stripe: any = useStripe();

  const elements: any = useElements();

  const handleOrderDate = (date: Date): any => {
    return addDateToCart(date);
  }

  const handleOrderCompletion = async (completeCart: interfaces.CompleteCart): Promise<any> => {
    // calls method that adds cart to user order history
    return completeOrder(user._id, completeCart, user.accessToken);
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

          changeOrderStatus('complete');

          // add date to cart
          await handleOrderDate(response.date);

          // add date to cart object (state doesn't update for next context method call)
          const completeCartObj: interfaces.CompleteCart = {
            products: cart.products,
            totalItemCount: cart.totalItemCount,
            date: response.date,
            taxes: cart.taxes,
            subtotal: cart.subtotal,
            total: cart.total,
            id: uuidv4()
          };

          // adds order to history
          handleOrderCompletion(completeCartObj);
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
