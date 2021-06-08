import React, { useState, useContext } from 'react';

import { GlobalContext } from '../../../contexts/GlobalContext';

import * as interfaces from '../../../modules/interfaces';
import * as productMethods from '../../../modules/productMethods';
import getMonthName from '../../../modules/getMonthName';
import getOrderNumber from '../../../modules/getOrderNumber';
import ProductCartDetails from '../../Products/ProductCartDetails';

import './order.css';

type OrderProps = {
  date: Date;
  id: string;
  products: interfaces.Product[];
  totalItemCount: number;
  subtotal: number;
  taxes: number;
  total: number;
  delivery: {
    status: boolean;
    eta: Date;
  };
};

const Order: React.FC<OrderProps> = ({ date, id, products, totalItemCount, subtotal, taxes, total, delivery }) => {
  const { user } = useContext(GlobalContext);

  const [displayProducts, setDisplayProducts] = useState(false);

  const orderDateString: string = date.toString();

  const orderDate = {
    year: orderDateString.slice(0,4),
    month: getMonthName(orderDateString.slice(5, 7)),
    day: orderDateString.slice(8,10)
  };

  const deliveryStatus = productMethods.getDeliveryStatus(delivery.eta);

  console.log(`deliveryStatus`, deliveryStatus);

  const etaString = delivery.eta.toString();
    // ? eta.toString()
    // : getETA().toISOString();

  const etaDate = {
    year: etaString.slice(0,4),
    month: getMonthName(etaString.slice(5, 7)),
    day: etaString.slice(8,10)
  };

  const orderNumber: string = getOrderNumber(id);

  const userShippingDetails: interfaces.Address = user.shippingAddress!;

  const ProductComponents: any = products.map((item: any) => (
    <ProductCartDetails 
      key={item.id}
      inCart={false}
      item={item}
    />
  ));

  const toggleProductDisplay = (): void => {
    setDisplayProducts(!displayProducts);
  }

  return (
    <div id="order__container">
      <div id="order-left__container">
        <span id="order-header">We hope you enjoy your purchase, {user.firstName}</span>
        
        <div id="order-details__container">
          <span id="order-date-text">Your order was placed on {orderDate.day} {orderDate.month} {orderDate.year}</span>
          <span id="order-number-text">Order number: {orderNumber}</span>
        </div>

        <div id="order-contact__container">
          <span id="order-details-header">Your Contact Details</span>

          <span id="order-name">{user.firstName} {user.lastName}</span>
          <span id="order-email">A copy of this confirmation was sent to {user.email}</span>
          <span id="order-phone">{user.phoneNumber}</span>
        </div>
          
        <div id="order-shipping__container">
          <span id="order-eta">Estimated delivery date: {etaDate.day} {etaDate.month} {etaDate.year}</span>

          <span id="order-address-header">Delivery to: </span>

          <span id="order-address-street">{userShippingDetails.street}</span>
          <span id="order-address-city">{userShippingDetails.city}</span>
          <span id="order-address-zipCode">{userShippingDetails.zipCode}</span>

          <span 
            id="order-address-state" 
            style={{ display: userShippingDetails.state !== 'none' ? 'none' : 'block' }}>
              {userShippingDetails.state}
          </span>
          <span id="order-address-country">{userShippingDetails.country}</span>
        </div>
      </div>

      <div id="order-right__container">
        <div id="order-items__container">
          <span id="order-items-text">Items you purchased</span>
          <button id="view-purchased-products-btn" onClick={toggleProductDisplay}>View Products</button>
          
          <div id="purchased-products__container" style={{ display: displayProducts ? 'block' : 'none' }}>
            {ProductComponents}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order;
