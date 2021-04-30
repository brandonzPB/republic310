import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const About: React.FC = ({ ...props }) => {
  const { dest, changeDest } = useContext(RouteContext);

  const content: string = "Our mission at The Republic 310 is to provide the best hemp product for your every need."

  return (
    <>
      <Helmet>
        <title>About Us | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/about'
          ? <div id="about__container"></div>
          : !dest
          ? <Route exact path="/about">
            <Redirect to="/" />
          </Route>
          : <Route exact path="/about">
            <Redirect to={dest} />
          </Route>
      }
    </>
  )
}

export default About;
