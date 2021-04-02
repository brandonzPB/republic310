import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import * as types from '../../modules/types';

const ProductThumbnail: React.FC<types.DisplayProduct> = ({ name, price, imageUrl, alt }: types.DisplayProduct) => {
  return (
    <div id="product-thumbnail__container"></div>
  )
}

export default ProductThumbnail;
