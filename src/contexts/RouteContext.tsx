import React, { useState, useEffect, createContext } from 'react';

interface Path {
  dest: string;
  changeDest: (dest: string) => void;
}

const initialPath: Path = {
  dest: '',
  changeDest: (dest: string): void => {}
};

export const RouteContext = createContext<Path>(initialPath);

const RouteContextProvider: React.FC = ({ children }) => {
  const [path, setPath] = useState(() => {
    const storedPath: any = localStorage.getItem('my-path');
    return storedPath ? JSON.parse(storedPath) : initialPath;
  });

  useEffect(() => {
    console.log('path', path);
    localStorage.setItem('my-path', JSON.stringify(path));
  }, [path]);

  const changeDest = (dest: string): void => {
    setPath({
      ...path,
      dest: dest
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
