import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import * as interfaces from '../../modules/interfaces';
import * as types from '../../modules/types';
import './product.css';

/// THIS IS THE DISPLAY/CARD COMPONENT OF A PRODUCT ///

const Product: React.FC<types.DisplayProduct> = ({ name, price, imageUrl, alt }: types.DisplayProduct) => {
  const { allProducts, addToCart, updateQuantity, updateTotalItemCount, cart, updateSubtotal } = useContext(GlobalContext);

  const { changeDest, changeProduct, product } = useContext(RouteContext);

  // GET PRODUCT DETAILS (helper)
  const getProductDetails = (productName: string): any => {
    const productDetails: interfaces.DisplayProduct = allProducts
      .find((product: interfaces.DisplayProduct) => product.name === productName)!;

    return productDetails;
  }

  // GET PRODUCT IN CART (helper)
  const getProductInCart = (productName: string): any => {
    return cart.products.find((item: interfaces.Product) => item.name === productName);
  }

  // GET CART ITEM COUNT (helper)
  const getCartItemTotal = (): any => {
    return cart.products.reduce((count, item) => { return count + item.quantity }, 0);
  }

  // UPDATE CART ITEM COUNT
  const updateCartCount = (): any => {
    const cartItemTotal: number = getCartItemTotal();
    return updateTotalItemCount(cartItemTotal + 1);
  }

  // UPDATE SUBTOTAL
  const updateCartSubtotal = (productPrice: number): any => {
    let cartSubtotal: any = cart.subtotal;
    return updateSubtotal(cartSubtotal + productPrice);
  }

  // HANDLE CART UPDATE
  const handleCartUpdate = (productName: string): any => {
    // get product from cart (if it exists)
    const productInCart: interfaces.Product = getProductInCart(productName);

    // increment cart item count
    updateCartCount();
    
    // product already exists in cart: increment quantity
    if (productInCart) {
      console.log('product already in cart');

      updateCartSubtotal(productInCart.price);
      return updateQuantity(productInCart.name, productInCart.quantity + 1);
    }

    console.log('product not yet in cart');

    // product doesn't exist in cart:
    // add product to cart (new object to be created)
    const productDetails: interfaces.DisplayProduct = getProductDetails(productName);

    // update cart subtotal
    updateCartSubtotal(productDetails.price);

    return addToCart(productDetails);
  }

  // UPDATE PRODUCT (variable in RouteContext state)
  const updateProductNav = (productDetails: interfaces.DisplayProduct): any => {
    return changeProduct(productDetails);
  }

  // HANDLE PRODUCT NAVIGATION
  const handleNav = (productName: string): void => {
    const productDetails: interfaces.DisplayProduct = getProductDetails(productName);

    updateProductNav(productDetails);

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
        <button id="add-to-cart-btn" onClick={() => handleCartUpdate(name)}>Add to Cart</button>
      </div>

      <div id="view-details-btn__container">
        <button id="view-details-btn" onClick={() => handleNav(name)}>View Details</button>
      </div>
    </div>
  )
}

export default Product;
