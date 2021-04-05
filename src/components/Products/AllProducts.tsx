import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import Product from './Product';
import * as interfaces from '../../modules/interfaces';
import quickSort from '../../modules/quickSort';

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

  const [sort, setSort] = useState({ type: '' });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    setSort({ ...sort, type: data.sort });
  }

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

  let sortedProducts: any = allProducts.slice();

  sortedProducts = sort.type === 'alphaAscend' ?
      sortedProducts.sort((a: interfaces.DisplayProduct, b: interfaces.DisplayProduct) => {
        return a.name.localeCompare(b.name);
      })

    : sort.type === 'alphaDescend' ? 
      sortedProducts.sort((a: interfaces.DisplayProduct, b: interfaces.DisplayProduct) => {
        return a.name.localeCompare(b.name);
      }).reverse()
    : sort.type === 'priceAscend' ?
      quickSort(sortedProducts)
    : quickSort(sortedProducts).reverse();

  const ProductComponents: any = sortedProducts.map((product: interfaces.DisplayProduct, index: number) => (
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

  return (
    <div id="all-products__container">
      <div id="sort-form__container">
        <form onSubmit={handleSubmit(onSubmit)}>

          <select name="sort" id="sort-select" ref={register}>
            <option value="alphaAscend">A-Z (ascending alphabetical)</option>
            <option value="alphaDescend">Z-A (descending alphabetical)</option>
            <option value="priceAscend">Price Ascending</option>
            <option value="priceDescend">Price Descending</option>
          </select>

          <button id="update-sort-btn">Update List</button>

        </form>
      </div>

      {ProductComponents}
    </div>
  )
}

export default AllProducts;