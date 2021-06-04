import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import Product from './Product';
import * as interfaces from '../../modules/interfaces';
import quickSortProducts from '../../modules/quickSortProducts';

import bearSrc from '../../assets/images/products/the_bear.jpg';
import bruinSrc from '../../assets/images/products/the_bruins.jpg';
import goldenSrc from '../../assets/images/products/the_golden_gate.jpg';
import hollywoodSrc from '../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../assets/images/products/the_malibu.jpg';
import mudslideSrc from '../../assets/images/products/the_mudslide.jpg';
import sanAndreasSrc from '../../assets/images/products/the_san_andreas.jpg';
import smogSrc from '../../assets/images/products/the_smog.png';
import surferSrc from '../../assets/images/products/the_surfer.jpg';

import './allProducts.css';

const AllProducts: React.FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const [sort, setSort] = useState({ type: '' });

  const content: string = 'View the best hemp has to offer with The Republic 310';

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setSort({ ...sort, type: data.sort });
  }

  if (!allProducts || !allProducts.length) {
    changeDest('/');

    return (
      <Route exact path="/products">
        <Redirect to="/" />
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
      quickSortProducts(sortedProducts, 'price')
    : quickSortProducts(sortedProducts, 'price').reverse();

  const ProductComponents: any = sortedProducts.map((product: interfaces.DisplayProduct) => (
    <Product 
      key={product._id}
      name={product.name}
      price={product.price}
      imageUrl={
        product.name === 'The Smog' ? smogSrc
          : product.name === 'The Hollywood' ? hollywoodSrc
          : product.name === 'The Golden Gate' ? goldenSrc
          : product.name === 'The Bear' ? bearSrc
          : product.name === 'The Surfer' ? surferSrc
          : product.name === 'The San Andreas' ? sanAndreasSrc
          : product.name === 'The Malibu' ? malibuSrc
          : product.name === 'The Mudslide' ? mudslideSrc
          : bruinSrc
      }
      alt={product.description}
    />
  ));

  return (
    <>
      <Helmet>
        <title>The Finest Hemp Products | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/products'
          ? <div id="all-products__container">
            <div id="sort-form__container">
              <form onSubmit={handleSubmit(onSubmit)} id="sort-products-form">

                <div id="custom-select">
                  <select name="sort" id="sort-select" ref={register}>
                    <option value="alphaAscend">A-Z (ascending alphabetical)</option>
                    <option value="alphaDescend">Z-A (descending alphabetical)</option>
                    <option value="priceAscend">Price Ascending</option>
                    <option value="priceDescend">Price Descending</option>
                  </select>
                  <span id="custom-arrow"></span>
                </div>
      
                <button id="update-sort-btn">Update List</button>
      
              </form>
            </div>
      
            <div id="all-product-components">
              {ProductComponents}
            </div>
          </div>
          : !dest
            ? <Route exact path="/products">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/products">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default AllProducts;