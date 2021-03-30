import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const ProductDetails: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  if (dest === 'home') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/" />
      </Route>
    )
  }

  const handleNav = (path: string): void => {
    changeDest(path);
  }

  return (
    <div id="product-details__container"></div>
  )
}

export default ProductDetails;