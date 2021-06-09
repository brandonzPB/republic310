import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import GlobalContextProvider from './contexts/GlobalContext';
import RouteContextProvider from './contexts/RouteContext';

import About from './components/About/About';
import AdminForm from './components/Admin/Verification/AdminForm';
import AllProducts from './components/Products/AllProducts';

import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Index from './components/Index/Index';

import NavBar from './components/NavBar/NavBar';
import OrderConfirmation from './components/Checkout/OrderConfirmation/OrderConfirmation';
import OrderDetails from './components/Orders/OrderDetails/OrderDetails';
import OrderHistory from './components/Orders/OrderHistory/OrderHistory';

import PasswordUpdate from './components/User/Update/PasswordUpdate';
import PaymentContainer from './components/Checkout/PaymentInfo/PaymentContainer';
import PostResetCode from './components/User/ForgotPassword/PostResetCode/PostResetCode';
import ProductDetails from './components/Products/ProductDetails';

import ResetPassword from './components/User/ForgotPassword/ResetPassword/ResetPassword';
import RequestResetCode from './components/User/ForgotPassword/Request/RequestResetCode';
import ShippingDetails from './components/Checkout/ShippingDetails/ShippingDetails';

import StatsContainer from './components/Admin/StatsContainer/StatsContainer';
import UpdateUser from './components/User/Update/UpdateUser';

import './App.css';

function App() {
  const content = 'The Republic 310 | Born and Raised in LA. Free of pesticides and preservatives';

  return (
    <BrowserRouter>
      <div className="App">
        <Helmet>
          <title>The Republic 310 | Hemp Re-imagined</title>
          <meta name="description" content={content} />
        </Helmet>

        <GlobalContextProvider>
          <RouteContextProvider>
            <NavBar />

            <Route exact path="/" component={Index} />
            <Route exact path="/about" component={About} />

            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout/confirmation" component={OrderConfirmation} />
            <Route exact path="/checkout/payment" component={PaymentContainer} />
            <Route exact path="/checkout/shipping" component={ShippingDetails} />

            <Route exact path="/order/details" component={OrderDetails} />
            <Route exact path="/order/history" component={OrderHistory} />

            <Route exact path="/product/details" component={ProductDetails} />
            <Route exact path="/products" component={AllProducts} />

            <Route exact path="/user/update" component={UpdateUser} />
            <Route exact path="/user/update/password" component={PasswordUpdate} />

            <Route exact path="/reset/code" component={PostResetCode} />
            <Route exact path="/reset/request" component={RequestResetCode} />
            <Route exact path="/reset/password" component={ResetPassword} />

            <Route exact path="/stats" component={AdminForm} />
            <Route exact path="/stats/verified" component={StatsContainer} />

            <Footer />
          </RouteContextProvider>
        </GlobalContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
