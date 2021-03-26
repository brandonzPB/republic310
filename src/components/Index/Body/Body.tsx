import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

const Body: React.FC = () => {
  const { changeDest } = useContext(RouteContext);

  /*
    What's hot
    top 3 products
    view all products
  */

  const viewProducts = (): void => {
    changeDest('products');
  }
  
  return (
    <div id="body__container">
      <div id="hot-products__container">
        <span id="hot-text">What's Hot</span>
      </div>

      <span id="all-products-link" onClick={viewProducts}>View All of Our Products</span>
    </div>
  )
}

export default Body;
