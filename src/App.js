import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContext';
import NavBar from './components/NavBar/NavBar';
import Index from './components/Index/Index';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalContextProvider>
          <NavBar />

          <Route exact path="/" component={Index} />
        </GlobalContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
