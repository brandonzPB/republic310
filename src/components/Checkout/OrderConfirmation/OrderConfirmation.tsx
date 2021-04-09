import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
import getMonthName from '../../../modules/getMonthName';
import getOrderNumber from '../../../modules/getOrderNumber';
import ProductCartDetails from '../../Products/ProductCartDetails';
import './orderConfirmation.css';

import hollywoodSrc from '../../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../../assets/images/products/the_malibu.jpg';
import sanAndreasSrc from '../../../assets/images/products/the_san_andreas.jpg';
import mudslideSrc from '../../../assets/images/products/the_mudslide.jpg';
import bruinSrc from '../../../assets/images/products/the_bruins.jpg';
import goldenGateSrc from '../../../assets/images/products/the_golden_gate.jpg';
import smogSrc from '../../../assets/images/products/the_smog.png';
import bearSrc from '../../../assets/images/products/the_bear.jpg';
import surferSrc from '../../../assets/images/products/the_surfer.jpg';

const OrderConfirmation: React.FC = () => {
  const { user, emailConfirmationToUser } = useContext(GlobalContext);
  
  const { dest, changeDest, orderStatus, changeOrderStatus } = useContext(RouteContext);

  const completeOrder: interfaces.CompleteCart = user.orderHistory[0];

  useEffect(() => {
    if (orderStatus === 'complete') {
      const userName: string = user.firstName!;
      const email: string = user.email!;
      const accessToken: string = user.accessToken!;
      const userId: string = user._id;

      emailConfirmationToUser(userName, userId, email, accessToken, completeOrder);
      return changeOrderStatus('incomplete');
    }
  }, []);

  if (!user.isAuthorized) {
    console.log('User not authorized');
    changeDest('home');
  }

  if (dest === 'home') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'shipping') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/checkout/shipping" />
      </Route>
    )
  }

  if (dest === 'payment') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/checkout/payment" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'productDetails') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/product/details" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/checkout/confirmation">
        <Redirect to="/about" />
      </Route>
    )
  }

  const ProductComponents: any = completeOrder.products.map((item: any) => (
    <ProductCartDetails 
      key={item.id}
      name={item.name}
      imageUrl={
        item.name === 'The Hollywood' ? hollywoodSrc
          : item.name === 'The Malibu' ? malibuSrc
          : item.name === 'The Surfer' ? surferSrc
          : item.name === 'The Mudslide' ? mudslideSrc
          : item.name === 'The Bruins' ? bruinSrc
          : item.name === 'The San Andreas' ? sanAndreasSrc
          : item.name === 'The Golden Gate' ? goldenGateSrc
          : item.name === 'The Bear' ? bearSrc
          : smogSrc
      }
      price={item.price}
      quantity={item.quantity}
      alt={item.name}
      inCart={false}
    />
  ))

  const orderDateString: string = completeOrder.date.toString();

  const orderDate = {
    year: orderDateString.slice(0,4),
    month: getMonthName(orderDateString.slice(5, 7)),
    day: orderDateString.slice(8,10)
  };

  const orderNumber: string = getOrderNumber(completeOrder.id);

  const userShippingDetails: interfaces.Address = user.shippingAddress!;

  return (
    <div id="order-confirmation__container">
      <span id="confirmation-header">We hope you enjoy your purchase, {user.firstName}</span>
      
      <div id="confirmation-details__container">
        <span id="confirmation-date-text">Your order was placed on {orderDate.day} {orderDate.month} {orderDate.year}</span>
        <span id="confirmation-order-number-text">Order number: {orderNumber}</span>
      </div>

      <div id="confirmation-contact__container">
        <span id="confirmation-details-header">Your Contact Details</span>

        <span id="confirmation-name">{user.firstName} {user.lastName}</span>
        <span id="confirmation-email">A copy of this confirmation was sent to {user.email}</span>
        <span id="confirmation-phone">{user.phoneNumber}</span>
      </div>
        
      <div id="confirmation-shipping__container">
        <span id="confirmation-eta">Estimated delivery date: </span>

        <span id="confirmation-address-header">Delivery to: </span>

        <span id="confirmation-address-street">{userShippingDetails.street}</span>
        <span id="confirmation-address-city">{userShippingDetails.city}</span>
        <span id="confirmation-address-zipCode">{userShippingDetails.zipCode}</span>

        <span 
          id="confirmation-address-state" 
          style={{ display: userShippingDetails.state !== 'none' ? 'none' : 'block' }}>
            {userShippingDetails.state}
        </span>
        <span id="confirmation-address-country">{userShippingDetails.country}</span>
      </div>

      <div id="confirmation-items__container">
        <span id="confirmation-items-text">Items you purchased</span>
        {ProductComponents}
      </div>
    </div>
  )
}

export default OrderConfirmation;
