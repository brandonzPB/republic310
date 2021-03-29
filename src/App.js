import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContext';
import RouteContextProvider from './contexts/RouteContext';

import NavBar from './components/NavBar/NavBar';
import Index from './components/Index/Index';

import AllProducts from './components/Products/AllProducts';
import ProductDetails from './components/Products/ProductDetails';

import CreateUser from './components/User/Create/CreateUser';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalContextProvider>
          <RouteContextProvider>
            <NavBar />

            <Route exact path="/" component={Index} />
            <Route exact path="/user/create" component={CreateUser} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/product/details" components={ProductDetails} />

            <Footer />
          </RouteContextProvider>
        </GlobalContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
