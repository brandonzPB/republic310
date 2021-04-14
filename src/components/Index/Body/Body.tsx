import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import { topProducts } from '../../../modules/topProducts';
import * as interfaces from '../../../modules/interfaces';
import Product from '../../Products/Product';
import './body.css';

import hollywoodSrc from '../../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../../assets/images/products/the_malibu.jpg';
import sanAndreasSrc from '../../../assets/images/products/the_san_andreas.jpg';

const Body: React.FC = () => {
  const { changeDest } = useContext(RouteContext);

  const viewProducts = (): void => {}

  const ProductComponents: any = topProducts.map((product: any, index: number) => (
    <Product 
      name={product.name}
      price={product.price}
      imageUrl={
        product.name === 'The Hollywood' ? hollywoodSrc
          : product.name === 'The Malibu' ? malibuSrc
          : sanAndreasSrc
      }
      alt={product.alt}
      key={index}
    />
  ));
  
  return (
    <div id="body__container">
      <div id="hot-products__container">
        <span id="hot-text">What's Hot</span>
        {ProductComponents}
      </div>

      <span id="all-products-link" onClick={viewProducts}>View All of Our Products</span>
    </div>
  )
}

export default Body;
