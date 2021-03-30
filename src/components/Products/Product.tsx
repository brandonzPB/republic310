import React from 'react';
import './product.css';

type DisplayProduct = {
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
};

const Product: React.FC<DisplayProduct> = ({ name, price, imageUrl, alt }: DisplayProduct) => {
  /// THIS IS THE DISPLAY/CARD COMPONENT OF A PRODUCT

  const addProductToCart = (e: React.SyntheticEvent): void => {}
  
  return (
    <div id="product__container">
      <div id="product-name__container">
        <span id="product-name">{name}</span>
      </div>

      <div id="product-img__container">
        <img id="product-img" src={imageUrl} alt={alt} />
      </div>

      <div id="product-price__container">
        <span id="product-price">{price}</span>
      </div>

      <div id="add-btn__container">
        <button id="add-to-cart-btn" onClick={addProductToCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Product;
