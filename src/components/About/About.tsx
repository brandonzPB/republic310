import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const About: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'productDetails') {
    return (
      <Route exact path="/about">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'home') {
    return (
      <Route exact path="/about">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/about">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/about">
        <Redirect to="/contact" />
      </Route>
    )
  }

  return (
    <div id="about__container"></div>
  )
}

export default About;
