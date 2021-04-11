import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { RouteContext } from '../../../../contexts/RouteContext';
import './postResetCode.css';

const PostResetCode: React.FC = () => {
  return (
    <div id="post-reset-code__container"></div>
  )
}

export default PostResetCode;