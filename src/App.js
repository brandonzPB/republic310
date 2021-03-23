import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContext';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import Body from './components/Body';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalContextProvider>
          <NavBar />

          <Body />

          <Route exact path="/" component={Header} />

        </GlobalContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
