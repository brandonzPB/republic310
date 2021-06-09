import React, { createContext, useReducer } from 'react';
import * as interfaces from '../modules/interfaces';
import { routeReducer } from '../reducers/routeReducer';

// INITIAL STATE
const initialPath: interfaces.Path = {
  dest: '/',
  product: {
    name: '',
    price: 0,
    _id: '',
    description: '',
    qtySold: 0,
    imageUrl: '',
    alt: ''
  },
  order: undefined,
  changeDest: (dest: string): void => {},
  changeProduct: (product: interfaces.DisplayProduct): void => {},
  changeOrder: (order: interfaces.CompleteCart): void => {},
  orderStatus: 'incomplete',
  changeOrderStatus: (newStatus: 'complete' | 'incomplete'): void => {},
}

export const RouteContext = createContext<interfaces.Path>(initialPath);

// FUNCTIONAL COMPONENT
const RouteContextProvider: React.FC = ({ children }) => {
  const [path, dispatch] = useReducer(routeReducer, initialPath);

  // CHANGE DESTINATION ROUTE
  const changeDest = (dest: string): void => {
    dispatch({ type: 'change_dest', payload: dest });
  }

  // CHANGE PRODUCT (that user is viewing)
  const changeProduct = (product: interfaces.DisplayProduct): void => {
    dispatch({ type: 'change_product', payload: product });
  }

  // CHANGE ORDER (that user is viewing)
  const changeOrder = (order: interfaces.CompleteCart): void => {
    dispatch({ type: 'change_order', payload: order });
  }

  // CHANGE ORDER STATUS
  const changeOrderStatus = (newStatus: 'complete' | 'incomplete'): void => {
    dispatch({ type: 'change_order_status', payload: newStatus });
  }

  initialPath.changeDest = changeDest;
  initialPath.changeProduct = changeProduct;
  initialPath.changeOrder = changeOrder;
  initialPath.changeOrderStatus = changeOrderStatus;

  return (
    <RouteContext.Provider value={path}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContextProvider;
