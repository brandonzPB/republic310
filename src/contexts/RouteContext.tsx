import React, { useState, useEffect, createContext } from 'react';

interface Path {
  dest: string;
  changeDest: (dest: string) => void;
}

const initialPath: Path = {
  dest: '',
  changeDest: (dest: string): void => {}
};

export const RouteContext = createContext(initialPath);

const RouteContextProvider: React.FC = ({ children }) => {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    console.log('path', path);
  }, [path]);

  const changeDest = (dest: string): void => {
    setPath({
      ...path,
      dest
    });
  }

  initialPath.changeDest = changeDest;

  return (
    <RouteContext.Provider value={path}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouteContextProvider;
