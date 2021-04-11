import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { RouteContext } from '../../../../contexts/RouteContext';
import './resetPassword.css';

const ResetPassword: React.FC = () => {
  return (
    <div id="reset-password__container"></div>
  )
}

export default ResetPassword;