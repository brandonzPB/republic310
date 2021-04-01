import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import * as interfaces from '../../modules/interfaces';
import * as types from '../../modules/types';
import './product.css';

/// THIS IS THE DISPLAY/CARD COMPONENT OF A PRODUCT ///

const Product: React.FC<types.DisplayProduct> = ({ name, price, imageUrl, alt }: types.DisplayProduct) => {
  const { allProducts, addToCart } = useContext(GlobalContext);

  const { changeDest, changeProduct } = useContext(RouteContext);

  const getProductDetails = (productName: string): any => {
    const productDetails: interfaces.DisplayProduct = allProducts
      .find((product: interfaces.DisplayProduct) => product.name === productName)!;

    return productDetails;
  }

  const handleAddToCart = (productName: string): void => {
    const productDetails: interfaces.DisplayProduct = getProductDetails(productName);

    const productObj: object = {
      name: productDetails.name,
      price: productDetails.price
    };

    addToCart(productObj);
  }

  const handleNav = (productName: string): void => {
    const productDetails: interfaces.DisplayProduct = getProductDetails(productName);

    changeProduct(productDetails);

    changeDest('productDetails');
  }
  
  return (
    <div id="product__container">
      <div id="product-name__container">
        <span id="product-name">{name}</span>
      </div>

      <div id="product-img__container" onClick={() => handleNav(name)}>
        <img id="product-img" src={imageUrl} alt={alt} />
      </div>

      <div id="product-price__container">
        <span id="product-price">${price}.00</span>
      </div>

      <div id="add-btn__container">
        <button id="add-to-cart-btn" onClick={() => handleAddToCart(name)}>Add to Cart</button>
      </div>

      <div id="view-details-btn__container">
        <button id="view-details-btn" onClick={() => handleNav(name)}>View Details</button>
      </div>
    </div>
  )
}

export default Product;
