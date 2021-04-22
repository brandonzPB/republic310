import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
import Order from '../../Orders/Order/Order';
import './orderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  const { user, emailConfirmationToUser, allProducts } = useContext(GlobalContext);
  
  const { dest, changeDest, orderStatus, changeOrderStatus } = useContext(RouteContext);

  const content: string = 'We hope you enjoy your order from The Republic 310';

  useEffect(() => {
    if (orderStatus === 'complete') {
      let userName: string = `${user.firstName} ${user.lastName}`;

      const phoneNumber: string = user.phoneNumber!;
      const email: string = user.email!;
      const accessToken: string = user.accessToken!;
      const userId: string = user._id;

      const completeOrder: interfaces.CompleteCart = user.orderHistory[0];

      const userObj = {
        name: userName,
        phoneNumber,
        email,
        id: userId,
        shippingAddress: user.shippingAddress,
        cart: completeOrder
      };

      emailConfirmationToUser(userObj, accessToken);

      return changeOrderStatus('incomplete');
    }
  }, []);

  if (!allProducts.length) {
    setTimeout(() => { changeDest('/') }, 700);
  }

  const completeOrder: interfaces.CompleteCart = user.orderHistory[0];

  return (
    <>
      <Helmet>
        <title>Your Order Confirmation | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/checkout/confirmation'
          ? <div id="order-confirmation__container">
            <Order 
              date={completeOrder.date}
              id={completeOrder.id}
              products={completeOrder.products}
              totalItemCount={completeOrder.totalItemCount}
              subtotal={completeOrder.subtotal}
              taxes={completeOrder.taxes}
              total={completeOrder.total}
            />
          </div>
          : !dest
            ? <Route exact path="/checkout/confirmation">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/checkout/confirmation">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default OrderConfirmation;
