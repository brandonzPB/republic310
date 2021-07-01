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

  const { dest, changeDest } = useContext(RouteContext);

  const content: string = 'Review your order history with The Republic 310';

  const OrderComponents: any = user.orderHistory.map((order: interfaces.CompleteCart) => (
    <OrderPreview
      key={order.id}
      order={order}
    />
  ));

  const routeToProducts = () => {
    changeDest('/products');
  }

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
              {
                OrderComponents.length
                  ? OrderComponents
                  : <>
                    <span id="no-orders-text">
                      You don't have any orders!
                    </span>
                    <span id="products-link-text" onClick={routeToProducts}>
                      Let's change that. Click here to view the finest hemp products on the market.
                    </span>
                  </>
              }
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
