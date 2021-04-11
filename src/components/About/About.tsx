import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const About: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'userInfo') {
    return (
      <Route exact path="/about">
        <Redirect to="/user/info" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/about">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/about">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/about">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/about">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'index' || dest !== 'about') {
    return (
      <Route exact path="/about">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div id="about__container"></div>
  )
}

export default About;
