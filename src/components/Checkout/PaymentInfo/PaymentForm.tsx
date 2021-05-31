import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as userServices from '../../../services/userServices';
import * as productServices from '../../../services/productServices';

import * as actions from '../../../modules/actions';
import * as interfaces from '../../../modules/interfaces';

import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import LoginModal from '../LoginModal/LoginModal';
import PayPalContainer from './PayPalContainer';

import './paymentForm.css';

const PaymentForm: React.FC = () => {
  const { cart, user, completeOrder, addDateToCart } = useContext(GlobalContext);

  const { changeOrderStatus } = useContext(RouteContext);

  const [modalDisplay, setModalDisplay] = useState({ show: true, error: false });

  const hideModal = (): void => {
    setModalDisplay({ ... modalDisplay, show: false, error: false });
  }

  const handleOrderDate = (date: Date): any => {
    return addDateToCart(date);
  }

  const handleOrderCompletion = async (completeCart: interfaces.CompleteCart): Promise<any> => {
    // calls method that adds cart to user order history
    return completeOrder(user._id, completeCart, user.accessToken);
  }

  // UPDATE PRODUCT SALES
  const handleProductSalesUpdate = async (): Promise<any> => {
    const accessToken: string = user.accessToken;

    // for each product, update product sales
    for (let i = 0; i < cart.products.length; i++) {

      const product: interfaces.Product = cart.products[i];

      const updater = async function(this: interfaces.Product, token: string) {
        const id: string = this.id;
        const quantity: number = this.quantity;
        const name: string = this.name;

        const productObj: any = { name, quantity };

        await actions.updateProductSales(productObj, id, token);
      }.bind(product, accessToken);

      updater();

    }

    return true;
  }

  return (
    <div id="payment-form__container">
      {
        modalDisplay.show
          ? <LoginModal hideModal={hideModal} modalDisplay={modalDisplay} />
          : <></>
      }

      {/* <span id="stripe-text-header">Powered by Stripe</span>
      
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement id="card-element" />
          </div>
        </fieldset>
        
        <button id="pay-btn">Pay</button>
      </form> */}

      <PayPalContainer
        handleOrderCompletion={handleOrderCompletion}
        handleOrderDate={handleOrderDate}
        handleProductSalesUpdate={handleProductSalesUpdate}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
    </div>
  )
}

export default PaymentForm;
