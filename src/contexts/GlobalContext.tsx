import React, { useState, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/classes/cart';
import ActionType from '../modules/actions';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([])
};

export const GlobalContext = createContext<interfaces.State>(initialState);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const [dispatchCall, setDispatchCall] = useState()

  const login = (name: string): void => {
    const userObj = { name };
    dispatch({ type: login, payload: userObj });
  }

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
