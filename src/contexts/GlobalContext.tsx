import React, { useState, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/classes/cart';
import * as actions from '../modules/actions';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([]),
  login: actions.login,
  logout: actions.logout,
  addToCart: actions.addToCart,
  removeFromCart: actions.removeFromCart,
  checkout: actions.checkout,
  updateUser: actions.updateUser,
  getOrders: actions.getOrders
};

export const GlobalContext = createContext<interfaces.State>(initialState);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const login = (): void => { 
    // call method from external module to make the magic happen
    // then call dispatch
    // return void
    // repeat for other functions   
  }

  const logout = () => {}

  const addToCart = () => {}

  const removeFromCart = () => {}

  const checkout = () => {}

  const updateUser = () => {}

  const getOrders = () => {}

  // update state methods
  // I've found that doing this allows for the functions
  // defined within GlobalContextProvider to be consumed globally

  initialState.login = login;

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
