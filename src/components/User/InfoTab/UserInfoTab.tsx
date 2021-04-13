import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './userInfoTab.css';

const UserInfoTab: React.FC = () => {
  const { user, logout } = useContext(GlobalContext);

  const { changeDest } = useContext(RouteContext);

  return (
    <div id="user-info__container">
      <ul id="user-info-list">
        <li className="user-info-list-item">
          <span className="user-info-text-link" onClick={() => changeDest('/order/history')}>View Orders</span>
        </li>

        <li className="user-info-list-item">
          <span className="user-info-text-link" onClick={() => changeDest('/user/update/password')}>Change Password</span>
        </li>

        <li className="user-info-list-item">
          <span className="user-info-text-link" onClick={() => changeDest('/user/update')}>Update Account Info</span>
        </li>

        <li className="user-info-list-item">
          <span className="user-info-text-link" onClick={logout}>Log out</span>
        </li>
      </ul>
    </div>
  )
}

export default UserInfoTab;