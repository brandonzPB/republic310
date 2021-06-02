import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import Product from './Product';
import * as interfaces from '../../modules/interfaces';
import quickSortProducts from '../../modules/quickSortProducts';

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
      imageUrl={product.imageUrl}
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