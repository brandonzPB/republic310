import React, { useState, useEffect, createContext, useReducer } from 'react';
import * as interfaces from '../modules/interfaces';
import { routeReducer } from '../reducers/routeReducer';

// INITIAL STATE
const LOCAL_STORAGE_KEY_PATH = 'republic-310-path';
const storedPath = localStorage.getItem(LOCAL_STORAGE_KEY_PATH);

const initialPath: interfaces.Path = storedPath
  ? JSON.parse(storedPath)
  : {
      dest: '/',
      product: {
        name: '',
        description: '',
        price: 0,
        id: 0,
        _id: 0,
        stock: 0,
        imageUrl: '',
        alt: ''
      },
      changeDest: (dest: string): void => {},
      changeProduct: (product: interfaces.DisplayProduct): void => {},
      orderStatus: 'incomplete',
      changeOrderStatus: (newStatus: 'complete' | 'incomplete'): void => {},
    };

export const RouteContext = createContext<interfaces.Path>(initialPath);

// FUNCTIONAL COMPONENT
const RouteContextProvider: React.FC = ({ children }) => {
  const [path, dispatch] = useReducer(routeReducer, initialPath);

  // CONSOLE LOG CHANGES TO STATE (path);
  // UPDATE LOCAL STORAGE
  useEffect(() => {
    console.log(path);

    localStorage.setItem(LOCAL_STORAGE_KEY_PATH, JSON.stringify(path));
    initialPath.dest = path.dest;
  }, [path]);

  const changeDest = (dest: string): void => {
    dispatch({ type: 'change_dest', payload: dest });
  }

  const changeProduct = (product: interfaces.DisplayProduct): void => {
    dispatch({ type: 'change_product', payload: product });
  }

  const changeOrderStatus = (newStatus: 'complete' | 'incomplete'): void => {
    dispatch({ type: 'change_order_status', payload: newStatus });
  }

  initialPath.changeDest = changeDest;
  initialPath.changeProduct = changeProduct;
  initialPath.changeOrderStatus = changeOrderStatus;

  return (
    <RouteContext.Provider value={path}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContextProvider;
