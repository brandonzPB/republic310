import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import Header from './Header/Header';
import Body from './Body/Body';

const Index: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

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
