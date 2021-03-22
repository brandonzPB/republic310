import React, { useEffect, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/cart';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([])
};

const initialDispatch: interfaces.Dispatch = {
  type: 'default',
  payload: null
};

export const GlobalStateContext = createContext<interfaces.State>(initialState);
export const GlobalDispatchContext = createContext<interfaces.Dispatch>(initialDispatch);

// state: { user, cart }
const GlobalContextProvider: React.FC = (props) => {
  const initialState: interfaces.State = {
    user: undefined,
    cart: new Cart([])
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {props.children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider;
