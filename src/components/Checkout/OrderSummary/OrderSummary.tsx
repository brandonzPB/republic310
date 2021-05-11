import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';

import ProductCartDetails from '../../Products/ProductCartDetails';
import './orderSummary.css';

// interface OrderSummaryProps {

// }

const OrderSummary: React.FC = () => {
  const { cart } = useContext(GlobalContext);
  
  const ProductComponents: any = cart.products.map((item: any) => (
    <ProductCartDetails 
      key={item.id}
      name={item.name}
      imageUrl={item.imageUrl}
      price={item.price}
      quantity={item.quantity}
      alt={item.name}
      inCart={false}
    />
  ));

  return(
    <div id="order-summary__container">
      <span id="order-summary-header">Your Order</span>

      {ProductComponents}

      <div id="order-summary-details__container">
        <span className="order-cost-text">Subtotal: ${cart.subtotal}</span>
        <span className="order-cost-text">Taxes: ${cart.taxes}</span>
        <span className="order-cost-text">Shipping: $</span>
        <span className="order-cost-text">Total: ${cart.total}</span>
      </div>
    </div>
  );
}

export default OrderSummary;