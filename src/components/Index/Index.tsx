import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';
import Header from './Header/Header';
import Body from './Body/Body'

const Index: React.FC = () => {
  const { dest, changeDest, orderStatus } = useContext(RouteContext);
  
  if (dest === 'userInfo') {
    return (
      <Route exact path="/">
        <Redirect to="/user/info" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/">
        <Redirect to="/contact" />
      </Route>
    )
  }

  return (
    <div id="index__container">
      <Header />
      <Body />
    </div>
  )
}

export default Index;
