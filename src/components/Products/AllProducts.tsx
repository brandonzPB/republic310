import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const AllProducts: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'home') {
    return (
      <Route exact path="/products">
        <Redirect to="/" />
      </Route>
    )
  }

  const handleNav = (path: string): void => {
    changeDest(path);
  }

  return (
    <div id="all-products__container"></div>
  )
}

export default AllProducts;