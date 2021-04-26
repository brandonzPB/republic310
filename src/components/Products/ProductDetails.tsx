import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import * as interfaces from '../../modules/interfaces';
import * as productMethods from '../../modules/productMethods';

const ProductDetails: React.FC = () => {
  const { allProducts, cart, updateTotalItemCount, updateSubtotal, updateQuantity, addToCart } = useContext(GlobalContext);

  const { dest, changeDest, product, changeProduct } = useContext(RouteContext);

  const content: string = 'Learn more about our fine hemp products at The Republic 310';

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
            <div id="left-col__container">
              <img alt={product.description} id="product-details-img"
                src={product.imageUrl} 
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
