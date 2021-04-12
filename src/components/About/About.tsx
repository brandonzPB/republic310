import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const About: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  // if (dest === 'cart') {
  //   return (
  //     <Route exact path="/about">
  //       <Redirect to="/cart" />
  //     </Route>
  //   )
  // }

  // if (dest === 'products') {
  //   return (
  //     <Route exact path="/about">
  //       <Redirect to="/products" />
  //     </Route>
  //   )
  // }

  // if (dest === 'contact') {
  //   return (
  //     <Route exact path="/about">
  //       <Redirect to="/contact" />
  //     </Route>
  //   )
  // }

  // if (dest === '/index' || dest !== '/about') {
  //   return (
  //     <Route exact path="/about">
  //       <Redirect to="/" />
  //     </Route>
  //   )
  // }

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
