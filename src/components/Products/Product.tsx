import React, { useContext } from 'react';

import { RouteContext } from '../../contexts/RouteContext';
import { GlobalContext } from '../../contexts/GlobalContext';

import * as interfaces from '../../modules/interfaces';
import * as types from '../../modules/types';
import * as productMethods from '../../modules/productMethods';

import bearSrc from '../../assets/images/products/the_bear.jpg';
import bruinSrc from '../../assets/images/products/the_bruins.jpg';
import goldenSrc from '../../assets/images/products/the_golden_gate.jpg';
import hollywoodSrc from '../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../assets/images/products/the_malibu.jpg';
import mudslideSrc from '../../assets/images/products/the_mudslide.jpg';
import sanAndreasSrc from '../../assets/images/products/the_san_andreas.jpg';
import smogSrc from '../../assets/images/products/the_smog.png';
import surferSrc from '../../assets/images/products/the_surfer.jpg';

import './product.css';

interface ProductProps {
  item: {
    name: string;
    price: number;
    alt?: string;
  };
};

/// THIS IS THE DISPLAY/CARD COMPONENT OF A PRODUCT ///

const Product: React.FC<ProductProps> = ({ item }) => {
  const { cart, allProducts, addToCart, updateQuantity, updateTotalItemCount, updateSubtotal } = useContext(GlobalContext);

  const { changeDest, changeProduct, product } = useContext(RouteContext);

  const imageSrc = 
    item.name === 'The Smog' ? smogSrc
    : item.name === 'The Hollywood' ? hollywoodSrc
    : item.name === 'The Golden Gate' ? goldenSrc
    : item.name === 'The Bear' ? bearSrc
    : item.name === 'The Surfer' ? surferSrc
    : item.name === 'The San Andreas' ? sanAndreasSrc
    : item.name === 'The Malibu' ? malibuSrc
    : item.name === 'The Mudslide' ? mudslideSrc
    : bruinSrc

  // UPDATE CART ITEM COUNT
  const updateCartCount = (): any => {
    const cartItemTotal: number = productMethods.getCartItemTotal(cart);
    return updateTotalItemCount(cartItemTotal + 1);
  }

  // UPDATE SUBTOTAL
  const updateCartSubtotal = (productPrice: number): any => {
    const cartSubtotal: any = cart.subtotal;
    return updateSubtotal(cartSubtotal + productPrice);
  }

  // HANDLE ADD PRODUCT TO CART
  const handleAddProductToCart = (productName: string): any => {
    // get product from cart (if it exists)
    const productInCart: interfaces.Product = productMethods.getProductInCart(productName, cart);

    // product already exists in cart: increment quantity
    if (productInCart) {
      updateCartSubtotal(productInCart.price);
      return updateQuantity(productInCart.name, productInCart.quantity + 1);
    }

    // product doesn't exist in cart:
    // add product to cart (new object to be created)
    const productDetails: interfaces.DisplayProduct = productMethods.getProductDetails(productName, allProducts);

    updateCartSubtotal(productDetails.price);
    return addToCart(productDetails);
  }

  // HANDLE CART UPDATE
  const handleCartUpdate = (productName: string): void => {
    // increment cart item count
    updateCartCount();

    handleAddProductToCart(productName);
  }

  // UPDATE PRODUCT (variable in RouteContext state)
  const updateProductNav = (productDetails: interfaces.DisplayProduct): any => {
    return changeProduct(productDetails);
  }

  // HANDLE PRODUCT NAVIGATION
  const handleNav = (productName: string): void => {
    const productDetails: interfaces.DisplayProduct = productMethods.getProductDetails(productName, allProducts);

    updateProductNav(productDetails);

    changeDest('/product/details');
  }
  
  return (
    <div id="product__container">
      <div id="product-details__container">
        <div id="product-top">
          <div id="product-name__container">
            <span id="product-name">{item.name}</span>
          </div>
        </div>

        <div id="product-body">
          <div id="product-img__container" onClick={() => handleNav(item.name)}>
            <img id="product-img" src={imageSrc} alt={item.alt} />
          </div>
        </div>

        <div id="product-bottom">
          <div id="product-price__container">
            <span id="product-price">${item.price}.00</span>
          </div>

          <div id="add-btn__container">
            <button id="add-to-cart-btn" onClick={() => handleCartUpdate(item.name)}>Add to Cart</button>
          </div>

          <div id="view-details-btn__container">
            <button id="view-details-btn" onClick={() => handleNav(item.name)}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
