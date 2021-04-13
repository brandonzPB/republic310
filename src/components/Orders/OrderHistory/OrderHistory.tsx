import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
import Order from '../Order/Order';
import './orderHistory.css';

const OrderHistory: React.FC = () => {
  const { user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const OrderComponents: any = user.orderHistory.map((order: interfaces.CompleteCart) => (
    <Order 
      key={order.id}
      date={order.date}
      id={order.id}
      products={order.products}
      totalItemCount={order.totalItemCount}
      subtotal={order.subtotal}
      taxes={order.taxes}
      total={order.total}
    />
  ));

  return (
    <>
      {
        dest === '/order/history'
          ? <div id="order-history__container">
            <span id="order-header">Your Orders</span>
            {OrderComponents}
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