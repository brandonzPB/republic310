import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const About: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  return (
    <>
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
