import React, { useState, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/classes/cart';
import * as actions from '../modules/actions';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([]),
  login: (user: interfaces.User):void => {},
  logout: (): void => {},
  addToCart: (product: interfaces.Product): void => {},
  removeFromCart: (product: interfaces.Product): void => {},
  checkout: (cart: interfaces.Cart): void => {},
  updateUser: (user: interfaces.User): void => {},
  getOrders: (orders: interfaces.Cart[]): void => {}
};

export const GlobalContext = createContext<interfaces.State>(initialState);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const login = (user: interfaces.User): void => { 
    // call method from external module to make the magic happen
    // then call dispatch
    // repeat for other functions   
  }

  const logout = (): void => {}

  const addToCart = (product: interfaces.Product): void => {}

  const removeFromCart = (product: interfaces.Product): void => {}

  const checkout = (cart: interfaces.Cart): void => {}

  const updateUser = (user: interfaces.User):void => {}

  const getOrders = (orders: interfaces.Cart[]): void => {}

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
