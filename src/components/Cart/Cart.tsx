import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';

import ProgressBar from '../Checkout/ProgressBar/ProgressBar';
import ProductCartDetails from '../Products/ProductCartDetails';

import './cart.css';

const Cart: React.FC = () => {
  const { cart, allProducts, updateTaxTotal, updateTotalCost } = useContext(GlobalContext);

  const { dest, changeDest, product } = useContext(RouteContext);

  const content: string = 'Select from the best hemp products on the market.';

  if (cart.totalItemCount === 0 || cart.products.length === 0) {
    setTimeout(() => { changeDest('/') }, 700);
  }

  if (allProducts === undefined) {
    changeDest('/');
  }

  // UPDATE TOTAL TAX (helper)
  const handleTotalTaxUpdate = (): any => {
    const taxTotal: number = cart.calculateTaxTotal();
    return updateTaxTotal(taxTotal);
  }

  // UPDATE TOTAL COST (helper)
  const handleTotalCostUpdate = (): any => {
    const total: number = cart.calculateTotal();
    return updateTotalCost(total);
  } 

  // HANDLE CHECKOUT (cart updates and routing)
  const handleCheckout = (): void => {
    // update total tax
    handleTotalTaxUpdate();

    // update total cost
    handleTotalCostUpdate();

    // redirect to shipping details input
    changeDest('/checkout/shipping');
  }

  const ProductComponents: any = cart.products.map((item: any) => (
    <ProductCartDetails 
      key={item.id}
      item={item}
      inCart={true}
    />
  ));
  
  return (
    <>
      <Helmet>
        <title>View your favorite producst from The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/cart'
          ? <> {
              cart.products.length === 0
                ? <div id="empty-cart__container">
                  <span id="empty-cart-text">Your cart is empty. Returning to home page...</span>
                </div>
                : <div id="cart__container">
                  <div id="cart-left__container">
                    <span id="cart-left-header">Your Products</span>
                    <div id="cart-products__container">
                      {ProductComponents}
                    </div>
                  </div>

                  <div id="cart-right__container">
                    <ProgressBar spotlight="cart" />

                    <div id="cart-subtotal__container">
                      <span id="cart-subtotal">Subtotal: ${cart.subtotal}.00</span>
                    </div>
        
                    <div id="checkout-btn__container">
                      <button id="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                  </div>
                </div>
          } </>
          : !dest
            ? <Route exact path="/cart">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/cart">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default Cart;
