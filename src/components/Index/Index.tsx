import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';
import Header from './Header/Header';
import Body from './Body/Body'

const Index: React.FC = () => {
  const { dest, changeDest, orderStatus } = useContext(RouteContext); 

  return (
    <>
      {
        dest === '/'
          ? <div id="index__container">
            <Header />
            <Body />
          </div>
          : !dest
            ? <Route exact path="/">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default Index;
