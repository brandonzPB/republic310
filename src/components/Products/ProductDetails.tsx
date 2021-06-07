import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';

import * as interfaces from '../../modules/interfaces';
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

import './productDetails.css';

const ProductDetails: React.FC = () => {
  const { allProducts, cart, updateTotalItemCount, updateSubtotal, updateQuantity, addToCart } = useContext(GlobalContext);

  const { dest, changeDest, product, changeProduct } = useContext(RouteContext);

  const content: string = 'Learn more about our top quality hemp products at The Republic 310';

  useEffect(() => {
    console.log(product);
  }, []);

  if (product.price === 0) {
    changeDest('/');
  }

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
    <>
      <Helmet>
        <title>Product Info | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/product/details'
          ? <div id="product-details__container">
            <div id="product-details-content__container">
              <div id="product-details-left">
                <div id="product-details-image__container">
                  <img alt={productMethods.getProductDescription(product.name)} id="product-details-img"
                    src={
                      product.name === 'The Smog' ? smogSrc
                        : product.name === 'The Hollywood' ? hollywoodSrc
                        : product.name === 'The Golden Gate' ? goldenSrc
                        : product.name === 'The Bear' ? bearSrc
                        : product.name === 'The Surfer' ? surferSrc
                        : product.name === 'The San Andreas' ? sanAndreasSrc
                        : product.name === 'The Malibu' ? malibuSrc
                        : product.name === 'The Mudslide' ? mudslideSrc
                        : bruinSrc
                    } 
                  />
                </div>
              </div>

              <div id="product-details-right">
                <div id="product-details-name">
                  <div id="product-details-name__container">
                    <span id="product-details-name">{product.name}</span>
                  </div>
                </div>

                <div id="product-details-description">
                  <div id="product-details-description__container">
                    <span id="product-details-description">{product.description}</span>
                  </div>

                  <div id="product-details-price__container">
                    <span id="product-details-price">{product.price}</span>
                  </div>
                </div>

                <div id="product-details-add-btn__container">
                  <button id="add-to-cart-btn" onClick={() => handleCartUpdate(product.name)}>Add to Cart</button>
                </div>
              </div>
            </div>
      
            <div id="certifications__container"></div>
            
            <div id="suggested-products__container"></div>
          </div>
          : !dest
            ? <Route exact path="/product/details">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/product/details">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default ProductDetails;
