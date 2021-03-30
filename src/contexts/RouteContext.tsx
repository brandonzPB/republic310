import React, { useState, useEffect, createContext, useReducer } from 'react';
import * as interfaces from '../modules/interfaces';
import { routeReducer } from '../reducers/routeReducer';

// INITIAL STATE
const LOCAL_STORAGE_KEY_PATH = 'my-path';
const storedPath = localStorage.getItem(LOCAL_STORAGE_KEY_PATH);

const initialPath: interfaces.Path = storedPath
  ? JSON.parse(storedPath)
  : {
      dest: 'test',
      changeDest: (dest: string): void => {}
    };

export const RouteContext = createContext<interfaces.Path>(initialPath);

// FUNCTIONAL COMPONENT
const RouteContextProvider: React.FC = ({ children }) => {
  const [path, dispatch] = useReducer(routeReducer, initialPath);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PATH, JSON.stringify(path));
    initialPath.dest = path.dest;
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
