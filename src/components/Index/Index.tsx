import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RouteContext } from '../../contexts/RouteContext';
import Header from './Header/Header';
import Body from './Body/Body'

const Index: React.FC = () => {
  const { dest } = useContext(RouteContext); 

  const content: string = 'The Republic 310 | Born and Raised in LA. Free of pesticides and preservatives';

  return (
    <>
      <Helmet>
        <title>The Republic 310 | Hemp Re-imagined</title>
        <meta name="description" content={content} />

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
      </Helmet>
    </>
  )
}

export default Index;
