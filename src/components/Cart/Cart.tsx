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

  const content: string = 'Add some items to your cart';

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
      name={item.name}
      imageUrl={item.imageUrl}
      price={item.price}
      quantity={item.quantity}
      alt={item.name}
      inCart={true}
    />
  ));
  
  return (
    <>
      <Helmet>
        <title>Your Cart | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/cart'
          ? <div id="cart__container">
            <ProgressBar spotlight="cart" />
            
            {
              cart.products.length === 0
                ? <div id="empty-cart__container">
                    <span id="empty-cart-text">Your cart is empty. Returning to home page...</span>
                  </div>
                : <div id="cart-display__container">
                  <div id="cart-products__container">
                    {ProductComponents}
                  </div>
      
                  <div id="cart-subtotal__container">
                    <span id="cart-subtotal">Subtotal: ${cart.subtotal}.00</span>
                  </div>
      
                  <div id="checkout-btn__container">
                    <button id="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                  </div>
                </div>
            }
          </div>
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
