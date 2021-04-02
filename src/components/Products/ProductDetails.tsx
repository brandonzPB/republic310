import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const ProductDetails: React.FC = () => {
  const { dest, changeDest, product, changeProduct } = useContext(RouteContext);

  useEffect(() => {
    console.log(product);
  }, []);

  if (product.price === 0) {
    changeDest('home');

    return (
      <Route exact path="/product/details">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'payment') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/checkout/payment" />
      </Route>
    )
  }

  if (dest === 'confirmation') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/checkout/confirmation" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/product/details">
        <Redirect to="/products" />
      </Route>
    )
  }

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
