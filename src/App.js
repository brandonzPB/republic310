import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContext';
import NavBar from './components/NavBar/NavBar';
import Index from './components/Index/Index';
import Login from './components/User/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalContextProvider>
          <NavBar />

          <Route exact path="/" component={Index} />
          <Route exact path="/user/login" component={Login} />
          
        </GlobalContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
