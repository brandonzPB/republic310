import React, { useEffect, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/classes/cart';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([])
};

export const GlobalContext = createContext<interfaces.State>(initialState);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const login = (user: string): void => {
    dispatch({ type: 'login', payload: })
  }

  return (
    <GlobalContext.Provider value={[state, login]}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
