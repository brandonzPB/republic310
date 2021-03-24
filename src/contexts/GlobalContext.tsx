import React, { useState, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/classes/cart';
import * as actions from '../modules/actions';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([]),
  createUser: actions.createUser,
  requestReset: (email: string): void => {},
  postResetCode: (code: string): void => {},
  resetPassword: (password: string): void => {},
  login: (user: object): void => {},
  logout: (): void => {},
  addToCart: (product: object): void => {},
  removeFromCart: (product: object): void => {},
  checkout: (cart: object): void => {},
  updateUser: (user: object): void => {},
  updateShipping: (): void => {},
  getOrders: (): void => {}
};

export const GlobalContext = createContext<interfaces.State>(initialState);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const requestReset = (email: string): void => {}

  const postResetCode = (code: string): void => {}

  const resetPassword = (password: string): void => {}

  const login = async (user: object): Promise<void> => { 
    // call method from external module to make the magic happen
    const authorizedUser: interfaces.User = await actions.login(user);
    // then call dispatch
    dispatch({ type: 'login', payload: authorizedUser });
    // repeat for other functions   
  }

  const logout = (): void => {}

  const addToCart = (product: object): void => {}

  const removeFromCart = (product: object): void => {}

  const checkout = (cart: object): void => {}

  const updateUser = (user: object):void => {}

  const updateShipping = (): void => {}

  const getOrders = (): void => {}

  // I've found that doing the following allows for the functions
  // defined within GlobalContextProvider to be consumed globally.
  // I've yet to find a better way to go about this...
  // (once I do, this will be changed and cleaned up)

  initialState.requestReset = requestReset;
  initialState.postResetCode = postResetCode;
  initialState.resetPassword = resetPassword;
  initialState.login = login;
  initialState.logout = logout;
  initialState.addToCart = addToCart;
  initialState.removeFromCart = removeFromCart;
  initialState.checkout = checkout;
  initialState.updateUser = updateUser;
  initialState.updateShipping = updateShipping;
  initialState.getOrders = getOrders;

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
