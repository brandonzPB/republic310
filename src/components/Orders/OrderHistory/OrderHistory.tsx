import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import * as interfaces from '../../../modules/interfaces';

import OrderPreview from '../OrderPreview/OrderPreview';

import './orderHistory.css';

const OrderHistory: React.FC = () => {
  const { user } = useContext(GlobalContext);

  const { dest } = useContext(RouteContext);

  const content: string = 'Review your order history with The Republic 310';

  const OrderComponents: any = user.orderHistory.map((order: interfaces.CompleteCart) => (
    <OrderPreview
      key={order.id}
      order={order}
    />
  ));

  return (
    <>
      <Helmet>
        <title>Your Order History | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/order/history'
          ? <div id="order-history__container">
            <span id="order-history-header">Your Orders</span>
            <div id="order-history-orders">
              {OrderComponents}
            </div>
          </div>
          : !dest
            ? <Route exact path="/order/history">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/order/history">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default OrderHistory;
