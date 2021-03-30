import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';

import './body.css';

const Body: React.FC = () => {
  const { changeDest } = useContext(RouteContext);
  const { login } = useContext(GlobalContext);
  /*
    the hollywood
    the san andreas
    the malibu
  */

  console.log(useContext(RouteContext).changeDest);
  console.log(useContext(RouteContext).dest);

  const viewProducts = (): void => {
    // changeDest('products');
    const test: any = login
    console.log(test);
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
