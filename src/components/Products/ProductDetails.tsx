import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import * as interfaces from '../../modules/interfaces';

import hollywoodSrc from '../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../assets/images/products/the_malibu.jpg';
import sanAndreasSrc from '../../assets/images/products/the_san_andreas.jpg';
import mudslideSrc from '../../assets/images/products/the_mudslide.jpg';
import bruinSrc from '../../assets/images/products/the_bruins.jpg';
import goldenGateSrc from '../../assets/images/products/the_golden_gate.jpg';
import smogSrc from '../../assets/images/products/the_smog.png';
import bearSrc from '../../assets/images/products/the_bear.jpg';
import surferSrc from '../../assets/images/products/the_surfer.jpg';

const ProductDetails: React.FC = () => {
  const { allProducts, cart, updateTotalItemCount, updateQuantity, addToCart } = useContext(GlobalContext);

  const { dest, changeDest, product, changeProduct } = useContext(RouteContext);

  useEffect(() => {
    console.log(product);
  }, []);

  if (product.price === 0) {
    changeDest('/');

    // return (
    //   <Route exact path="/product/details">
    //     <Redirect to="/" />
    //   </Route>
    // )
  }

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

  // HANDLE CART UPDATE
  const handleCartUpdate = (productName: string): any => {
    // get product from cart (if it exists)
    const productInCart: interfaces.Product = getProductInCart(productName);

    // increment cart item count
    updateCartCount();
    
    // product already exists in cart: increment quantity
    if (productInCart) {
      console.log('product already in cart');
      return updateQuantity(productInCart.name, productInCart.quantity + 1);
    }

    console.log('product not yet in cart');

    // product doesn't exist in cart:
    // add product to cart (new object to be created)
    const productDetails: interfaces.DisplayProduct = getProductDetails(productName);

    const productObj: any = {
      name: productDetails.name,
      price: productDetails.price,
    };

    return addToCart(productObj);
  }

  return (
    <>
      {
        dest === '/product/details'
          ? <div id="product-details__container">
            <div id="left-col__container">
              <img alt={product.description} id="product-details-img"
                src={
                  product.name === 'The Hollywood' ? hollywoodSrc
                    : product.name === 'The Malibu' ? malibuSrc
                    : product.name === 'The Surfer' ? surferSrc
                    : product.name === 'The Mudslide' ? mudslideSrc
                    : product.name === 'The Bruins' ? bruinSrc
                    : product.name === 'The San Andreas' ? sanAndreasSrc
                    : product.name === 'The Golden Gate' ? goldenGateSrc
                    : product.name === 'The Bear' ? bearSrc
                    : smogSrc
                } 
              />
            </div>
      
            <div id="right-col__container">
              <div id="product-details-name__container">
                <span id="product-details-name">{product.name}</span>
              </div>
      
              <div id="product-details-price__container">
                <span id="product-details-price">{product.price}</span>
              </div>
      
              <div id="product-details-description__container">
                <span id="product-details-description">{product.description}</span>
              </div>
      
              <div id="product-details-add-btn__container">
                <button id="add-to-cart-btn" onClick={() => handleCartUpdate(product.name)}>Add to Cart</button>
              </div>
            </div>
      
            <div id="suggested-products__container"></div>
      
            <div id="certifications__container"></div>
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
