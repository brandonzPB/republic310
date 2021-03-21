import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';

import GlobalContextProvider from './contexts/GlobalContext';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalContextProvider>

          {/* */}

        </GlobalContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
