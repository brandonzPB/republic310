import React from 'react';

interface ProductProps {
  name: string;
  description: string;
  price: number;
  
}

const Product: React.FC = ({ product }) => {
  /// THIS IS THE DISPLAY/CARD COMPONENT OF A PRODUCT
  
  return (
    <div id="product__container">
      <div id="product-name__container">
        <span id="product-name">{product.name}</span>
      </div>
    </div>
  )
}

export default Product;
