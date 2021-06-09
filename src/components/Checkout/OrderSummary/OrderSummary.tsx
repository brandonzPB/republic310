import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';

import ProductCartDetails from '../../Products/ProductCartDetails';
import './orderSummary.css';

const OrderSummary: React.FC = () => {
  const { cart } = useContext(GlobalContext);

  const ProductComponents: any = cart.products.map((item: any) => (
    <ProductCartDetails 
      key={item.id}
      inCart={false}
      item={item}
    />
  ));

  return(
    <div id="order-summary__container">
      <span id="order-summary-header">Your Order</span>

      {ProductComponents}

      <div id="order-summary-details__container">
        <span className="order-cost-text"><strong className="strong-text">Subtotal:</strong> ${cart.subtotal.toFixed(2)}</span>
        <span className="order-cost-text"><strong className="strong-text">Taxes:</strong> ${cart.taxes.toFixed(2)}</span>
        <span className="order-cost-text"><strong className="strong-text">Shipping:</strong> $2.99</span>
        <span className="order-cost-text"><strong className="strong-text">Total:</strong> ${(cart.total + 2.99).toFixed(2)}</span>
      </div>
    </div>
  );
}

export default OrderSummary;