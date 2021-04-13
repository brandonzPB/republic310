import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './cancelOrder.css';

const CancelOrder: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  return (
    <>
      {
        dest === '/order/cancel'
          ? <div id="cancel-order__container"></div>
          : !dest
            ? <Route exact path="/order/cancel">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/order/cancel">
              <Redirect to={dest} />
            </Route>
        }
    </>
  )
}

export default CancelOrder;
