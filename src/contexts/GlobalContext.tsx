import React, { useEffect, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces';

export const GlobalStateContext = createContext(null);
export const GlobalDispatchContext = createContext(null);

// state: { user, cart }
const GlobalContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(globalReducer, {}, () => {
    const storedState = localStorage.getItem('my-state');
    return storedState ? JSON.parse(storedState) : {};
  });

  useEffect(() => {
    localStorage.setItem('my-state', JSON.stringify(state));
  }, [state]);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {props.children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider;
