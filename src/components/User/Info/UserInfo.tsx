import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './userInfo.css';

const UserInfo: React.FC = () => {
  const { user, logout } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'userUpdate') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  if (dest === 'passwordUpdate') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/user/update/password" />
      </Route>
    )
  }

  if (dest === 'orderCancel') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/order/cancel" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/about" />
      </Route>
    )
  }
  if (dest === 'index' || dest !== 'userInfo') {
    return (
      <Route exact path="/user/info">
        <Redirect to="/" />
      </Route>
    )
  }

  return (
    <div id="user-info__container"></div>
  )
}

export default UserInfo;
