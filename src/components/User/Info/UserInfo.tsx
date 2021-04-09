import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './userInfo.css';

const UserInfo: React.FC = () => {
  const { user, logout } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  return (
    <div id="user-info__container"></div>
  )
}

export default UserInfo;
