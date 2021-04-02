import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import Product from './Product';

import hollywoodSrc from '../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../assets/images/products/the_malibu.jpg';
import sanAndreasSrc from '../../assets/images/products/the_san_andreas.jpg';
import mudslideSrc from '../../assets/images/products/the_mudslide.jpg';
import bruinSrc from '../../assets/images/products/the_bruins.jpg';
import goldenGateSrc from '../../assets/images/products/the_golden_gate.jpg';
import smogSrc from '../../assets/images/products/the_smog.png';
import bearSrc from '../../assets/images/products/the_bear.jpg';
import surferSrc from '../../assets/images/products/the_surfer.jpg';

const AllProducts: React.FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  if (!allProducts || !allProducts.length) {
    changeDest('home');

    return (
      <Route exact path="/products">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/products">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/products">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'payment') {
    return (
      <Route exact path="/products">
        <Redirect to="/checkout/payment" />
      </Route>
    )
  }

  if (dest === 'confirmation') {
    return (
      <Route exact path="/products">
        <Redirect to="/checkout/confirmation" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/products">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'home') {
    return (
      <Route exact path="/products">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/products">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/products">
        <Redirect to="/contact" />
      </Route>
    )
  }

  const ProductComponents: any = allProducts.map((product: any, index: number) => (
    <Product 
      key={index}
      name={product.name}
      price={product.price}
      imageUrl={
        product.name === 'The Hollywood' ? hollywoodSrc
          : product.name === 'The Malibu' ? malibuSrc
          : product.name === 'The Surfer' ? surferSrc
          : product.name === 'The Mudslide' ? mudslideSrc
          : product.name === 'The Bruins' ? bruinSrc
          : product.name === 'The San Andreas' ? sanAndreasSrc
          : product.name === 'The Golden Gate' ? goldenGateSrc
          : product.name === 'The Bear' ? bearSrc
          : smogSrc
      }
      alt={product.description}
    />
  ));

  const handleNav = (path: string): void => {
    changeDest(path);
  }

  return (
    <div id="all-products__container">
      {ProductComponents}
    </div>
  )
}

export default AllProducts;