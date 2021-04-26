import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import * as interfaces from '../../modules/interfaces';
import * as types from '../../modules/types';
import * as productMethods from '../../modules/productMethods';
import './product.css';

/// THIS IS THE DISPLAY/CARD COMPONENT OF A PRODUCT ///

const Product: React.FC<types.DisplayProduct> = ({ name, price, imageUrl, alt }: types.DisplayProduct) => {
  const { cart, allProducts, addToCart, updateQuantity, updateTotalItemCount, updateSubtotal } = useContext(GlobalContext);

  const { changeDest, changeProduct, product } = useContext(RouteContext);

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
        <button id="add-to-cart-btn" onClick={() => handleCartUpdate(name)}>Add to Cart</button>
      </div>

      <div id="view-details-btn__container">
        <button id="view-details-btn" onClick={() => handleNav(name)}>View Details</button>
      </div>
    </div>
  )
}

export default Product;
