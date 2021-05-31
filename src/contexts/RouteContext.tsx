import React, { useRef, useEffect, createContext, useReducer } from 'react';
import * as interfaces from '../modules/interfaces';
import { routeReducer } from '../reducers/routeReducer';

// INITIAL STATE
const LOCAL_STORAGE_KEY_PATH = 'republic-310-path';
const storedPath = localStorage.getItem(LOCAL_STORAGE_KEY_PATH);

const initialPath: interfaces.Path = storedPath
  ? JSON.parse(storedPath)
  : {
      dest: '/',
      // history: [],
      // historyIndex: 0,
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
      // pushToHistory: (path: string, history: string[]): void => {},
      // traverseHistory: (forward: boolean): void => {},
    };

export const RouteContext = createContext<interfaces.Path>(initialPath);

// FUNCTIONAL COMPONENT
const RouteContextProvider: React.FC = ({ children }) => {
  const [path, dispatch] = useReducer(routeReducer, initialPath);

  useEffect(() => {
    if (path.dest === '/checkout/confirmation') {
      path.dest = '/';
    }
  }, []);

  // CONSOLE LOG CHANGES TO STATE (path);
  // UPDATE LOCAL STORAGE
  useEffect(() => {
    console.log('path', path);
    console.log('initialPath', initialPath);

    localStorage.setItem(LOCAL_STORAGE_KEY_PATH, JSON.stringify(path));
    initialPath.dest = path.dest;
    // initialPath.history = path.history;
    // initialPath.historyIndex = path.historyIndex;
  }, [path, initialPath]);

  // CHANGE DESTINATION ROUTE
  const changeDest = (dest: string): void => {
    dispatch({ type: 'change_dest', payload: dest });
  }

  // CHANGE PRODUCT (that user is viewing)
  const changeProduct = (product: interfaces.DisplayProduct): void => {
    dispatch({ type: 'change_product', payload: product });
  }

  // CHANGE ORDER STATUS
  const changeOrderStatus = (newStatus: 'complete' | 'incomplete'): void => {
    dispatch({ type: 'change_order_status', payload: newStatus });
  }

  // // PUSH TO HISTORY
  // const pushToHistory = (path: string, history: string[]): any => {
  //   if (history.length) {
  //     return dispatch({ type: 'push_to_existing_history', payload: path });
  //   }
    
  //   return dispatch({ type: 'push_to_empty_history', payload: path });
  // }

  // // TRAVERSE HISTORY (forward or backward)
  // const traverseHistory = (forward: boolean): any => {
  //   if (forward) {
  //     // cannot move past last item in history
  //     if (initialPath.historyIndex === (initialPath.history.length - 1)) return false;

  //     return dispatch({ type: 'traverse_history', payload: initialPath.historyIndex + 1 });
  //   }

  //   // move backward

  //   // cannot move back past 0
  //   if (initialPath.historyIndex === 0) return false;

  //   return dispatch({ type: 'traverse_history', payload: initialPath.historyIndex - 1});
  // }

  initialPath.changeDest = changeDest;
  initialPath.changeProduct = changeProduct;
  initialPath.changeOrderStatus = changeOrderStatus;
  // initialPath.pushToHistory = pushToHistory;
  // initialPath.traverseHistory = traverseHistory;

  return (
    <RouteContext.Provider value={path}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContextProvider;
