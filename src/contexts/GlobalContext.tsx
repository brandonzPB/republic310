import React, { useState, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/classes/cart';
import * as actions from '../modules/actions';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([]),
  login: actions.login,
};

// const initialDispatch: interfaces.Dispatch = {
//   method: () => {}
// };

export const GlobalContext = createContext<interfaces.State>(initialState);
// export const GlobalDispatchContext = createContext<interfaces.Dispatch>(initialDispatch);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const login = (name: string): void => {
    console.log('success!');
    
    // const userObj = { name };
    // dispatch({ type: 'login', payload: userObj });
  }

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
