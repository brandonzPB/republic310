import React, { useEffect, useContext, useRef } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { RouteContext } from '../../../contexts/RouteContext';

import Order from '../Order/Order';

const OrderDetails: React.FC = () => {
  const { changeDest, dest, order } = useContext(RouteContext);

  const orderRef = useRef(true);

  useEffect(() => {
    return () => {
      orderRef.current = false;
    }
  }, []);

  if (order === undefined) {
    changeDest('/');
  }

  const content = `The Best CBD and CBG Products on the Market | Hemp Reimagined`

  return (
    <>
      <Helmet>
        <title>Product Info | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/order/details'
          ? <div id="order-details__container">
            {
              order
              ? <Order order={order} />
              : <></>
            }
          </div>
          : !dest
            ? <Route exact path="/product/details">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/product/details">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default OrderDetails;
