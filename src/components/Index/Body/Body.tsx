import React, { useContext } from 'react';

import { RouteContext } from '../../../contexts/RouteContext';
import { topProducts } from '../../../modules/topProducts';

import Product from '../../Products/Product';
import './body.css';
import womanSrc from '../../../assets/images/woman_using_small.png';

const Body: React.FC = () => {
  const { changeDest } = useContext(RouteContext);

  const ProductComponents: any = topProducts.map((product: any, index: number) => (
    <Product 
      item={product}
      key={index}
    />
  ));

  return (
    <div id="body__container">
      <span id="hot-text">What's Hot</span>

      <div id="hot-products__container">
        {ProductComponents}
      </div>

      <span id="all-products-link" onClick={() => changeDest('/products')}>View All of Our Products</span>
      
      <div id="body-img__container">
        <img
          alt="A smiling woman with a stylish afro using a Full-Spectrum CBD tincture from The Republic 310"
          id="woman-img"
          src={womanSrc}
        />
      </div>
    </div>
  )
}

export default Body;
