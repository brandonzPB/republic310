import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContext';
import RouteContextProvider from './contexts/RouteContext';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import Index from './components/Index/Index';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

import AllProducts from './components/Products/AllProducts';
import ProductDetails from './components/Products/ProductDetails';

import Cart from './components/Cart/Cart';
import ShippingDetails from './components/Checkout/ShippingDetails/ShippingDetails';
import StripeContainer from './components/Checkout/PaymentInfo/StripeContainer';
import OrderConfirmation from './components/Checkout/OrderConfirmation/OrderConfirmation';

import UserInfo from './components/User/Info/UserInfo';
import UpdateUser from './components/User/Update/UpdateUser';
import PasswordUpdate from './components/User/Update/PasswordUpdate';

import OrderHistory from './components/Orders/OrderHistory/OrderHistory';
import CancelOrder from './components/Orders/CancelOrder/CancelOrder.tsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalContextProvider>
          <RouteContextProvider>
            <NavBar />

            <Route exact path="/" component={Index} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />

            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/product/details" component={ProductDetails} />

            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout/shipping" component={ShippingDetails} />
            <Route exact path="/checkout/payment" component={StripeContainer} />
            <Route exact path="/checkout/confirmation" component={OrderConfirmation} />

            <Route exact path="/user/info" component={UserInfo} />
            <Route exact path="/user/update/details" component={UpdateUser} />
            <Route exact path="/user/update/password" component={PasswordUpdate} />

            <Route exact path="/order/history" component={OrderHistory} />
            <Route exact path="/order/cancel" component={CancelOrder} />

            <Footer />
          </RouteContextProvider>
        </GlobalContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
