import React, { useContext, useEffect, useRef } from 'react';

import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';

import bearSrc from '../../../assets/images/products/the_bear.jpg';
import bruinSrc from '../../../assets/images/products/the_bruins.jpg';
import goldenSrc from '../../../assets/images/products/the_golden_gate.jpg';
import hollywoodSrc from '../../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../../assets/images/products/the_malibu.jpg';
import mudslideSrc from '../../../assets/images/products/the_mudslide.jpg';
import sanAndreasSrc from '../../../assets/images/products/the_san_andreas.jpg';
import smogSrc from '../../../assets/images/products/the_smog.png';
import surferSrc from '../../../assets/images/products/the_surfer.jpg';

interface OrderPreviewProps {
  order: interfaces.CompleteCart;
};

const OrderPreview: React.FC<OrderPreviewProps> = ({ order }) => {
  const { changeDest, changeOrder } = useContext(RouteContext);

  const previewRef = useRef(true);

  useEffect(() => {
    return () => {
      previewRef.current = false;
    }
  }, []);

  const ProductComponents = order.products.map(product => {
    return (
      <div id="order-preview-product">
        <img
          alt={`${product.name} - One of the Best Hemp Products on the Market`}
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
    )
  });

  const handleNav = () => {
    changeOrder(order);

    changeDest('/order/details');
  }

  return (
    <div id="order-preview__container">
      <div id="order-preview-left">
        <span id="order-preview-date">Total Quantity: {order.totalItemCount}</span>
        <span id="order-preview-date">Placed on {order.date}</span>
        {
          order.delivery &&
          <span id="order-preview-delivery">
            {
              order.delivery.status ? 
                `Delivered on `
                : `Expected delivery: `
            }
            `${order.delivery.eta}`
          </span>
        }
      </div>

      <div id="order-preview-center">
        {ProductComponents}
      </div>

      <div id="order-preview-right">
        <button id="view-order-btn" onClick={handleNav}>View Order</button>
      </div>
    </div>
  )
}

export default OrderPreview;
