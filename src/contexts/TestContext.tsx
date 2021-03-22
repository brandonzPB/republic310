import React, { useEffect, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';
import Cart from '../modules/cart';

const initialState: interfaces.State = {
  user: undefined,
  cart: new Cart([])
};

const initialDispatch: interfaces.Dispatch = {
  type: '',
  payload: null
};

interface Context {
  state: interfaces.State;
  dispatch: interfaces.Dispatch;
};

export const TestContext = createContext<Context>({
  state: initialState,
  dispatch: initialDispatch
});

// state: { user, cart }
const TestContextProvider: React.FC = (props) => {
  const initialState: interfaces.State = {
    user: undefined,
    cart: new Cart([])
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TestContext.Provider>
  )
}

export default TestContextProvider;
