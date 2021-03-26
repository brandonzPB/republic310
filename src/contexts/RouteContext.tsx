import React, { useState, useEffect, useCallback, createContext, useReducer } from 'react';
import { useLocalStorage } from 'react-use';
import * as interfaces from '../modules/interfaces';
import { routeReducer } from '../reducers/routeReducer';

// INITIAL STATE
const initialPath: interfaces.Path = {
  dest: 'test',
  changeDest: (dest: string): void => {}
};

const LOCAL_STORAGE_KEY_PATH = 'my-path';

export const RouteContext = createContext<interfaces.Path>(initialPath);

// FUNCTIONAL COMPONENT
const RouteContextProvider: React.FC = ({ children }) => {
  const [path, dispatch] = useReducer(routeReducer, initialPath, () => {
    const storedPath = localStorage.getItem(LOCAL_STORAGE_KEY_PATH);
    return storedPath ? JSON.parse(storedPath) : initialPath;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PATH, JSON.stringify(path));
  }, [path]);

  const changeDest = (dest: string): void => {
    dispatch({ type: 'change_dest', payload: dest });
  }

  initialPath.changeDest = changeDest;

  return (
    <RouteContext.Provider value={path}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContextProvider;
