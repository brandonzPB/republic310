import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { RouteContext } from '../../../../contexts/RouteContext';
import './requestResetCode.css';

const RequestResetCode: React.FC = () => {
  return (
    <div id="request-reset-code__container"></div>
  )
}

export default RequestResetCode;