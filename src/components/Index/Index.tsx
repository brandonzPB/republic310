import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RouteContext } from '../../contexts/RouteContext';
import Header from './Header/Header';
import Body from './Body/Body'

const Index: React.FC = () => {
  const { dest } = useContext(RouteContext); 

  const content: string = 'Hemp born and Raised in LA. Completely organic and free of pesticides and preservatives';

  return (
    <>
      <Helmet>
        <title>The Best Organic Hemp on the Market</title>
        <meta name="description" content={content} />
      </Helmet>
      
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
