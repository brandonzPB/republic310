import React, { useState, useContext } from 'react';

import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';

import * as interfaces from '../../modules/interfaces';

import bearSrc from '../../assets/images/products/the_bear.jpg';
import bruinSrc from '../../assets/images/products/the_bruins.jpg';
import goldenSrc from '../../assets/images/products/the_golden_gate.jpg';
import hollywoodSrc from '../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../assets/images/products/the_malibu.jpg';
import mudslideSrc from '../../assets/images/products/the_mudslide.jpg';
import sanAndreasSrc from '../../assets/images/products/the_san_andreas.jpg';
import smogSrc from '../../assets/images/products/the_smog.png';
import surferSrc from '../../assets/images/products/the_surfer.jpg';

import './productCartDetails.css';

type CartProduct = {
  inCart: boolean;
  item: {
    name: string;
    price: number;
    quantity: number;
    alt: string;
  };
};

const ProductCartDetails: React.FC<CartProduct> = ({ inCart, item }: CartProduct) => {
  const { cart, updateTotalItemCount, updateQuantity, removeFromCart, allProducts, updateSubtotal } = useContext(GlobalContext);

  const { dest, changeDest, changeProduct } = useContext(RouteContext);

  const [qty, setQty] = useState({ amount: item.quantity });

  const imageSrc = 
    item.name === 'The Smog' ? smogSrc
    : item.name === 'The Hollywood' ? hollywoodSrc
    : item.name === 'The Golden Gate' ? goldenSrc
    : item.name === 'The Bear' ? bearSrc
    : item.name === 'The Surfer' ? surferSrc
    : item.name === 'The San Andreas' ? sanAndreasSrc
    : item.name === 'The Malibu' ? malibuSrc
    : item.name === 'The Mudslide' ? mudslideSrc
    : bruinSrc

  const getCartItemTotal = (): any => {
    return cart.products.reduce((count, item) => { return count + item.quantity }, 0);
  }

  const updateCartCount = (): any => {
    let cartItemTotal: number = getCartItemTotal();

    updateTotalItemCount(cartItemTotal - item.quantity + qty.amount);
  }

  const updateCartSubtotal = (productPrice: number): any => {
    let cartSubtotal: number = cart.subtotal;
    
    // decrease subtotal (of previous quantity)
    cartSubtotal -= productPrice * item.quantity;
    
    // increase subtotal
    return updateSubtotal(cartSubtotal + (productPrice * qty.amount));
  }

  const handleQuantityUpdate = (): any => {
    updateCartCount();

    updateCartSubtotal(item.price);

    if (qty.amount === 0) {
      return removeFromCart(item.name);
    }

    return updateQuantity(item.name, qty.amount);
  }

  const decrementQuantity = (): void => {
    setQty({ ...qty, amount: qty.amount - 1 });
  }

  const incrementQuantity = (): void => {
    setQty({ ...qty, amount: qty.amount + 1 });
  }

  const getProductDetails = (productName: string): any => {
    const productDetails: interfaces.DisplayProduct = allProducts
      .find((product: interfaces.DisplayProduct) => product.name === productName)!;

    return productDetails;
  }

  const handleNav = () => {
    const productDetails: interfaces.DisplayProduct = getProductDetails(item.name);
    
    changeProduct(productDetails);

    changeDest('/product/details');
  }

  return (
    <div id="product-thumbnail__container">
      <div id="product-thumbnail-name__container">
        <span id="product-thumbnail-name">{item.name}</span>
      </div>

      <div id="product-thumbnail-image__container">
        <img src={imageSrc} alt={item.alt} id="product-thumbnail-image" />

        <button id="product-thumbnail-view-btn" onClick={handleNav}>View Details</button>
      </div>

      <div id="product-thumbnail-price__container">
        <span id="product-thumbnail-price">${item.price}.00</span>
      </div>

      <div id="product-thumbnail-quantity-change__container" style={{ display: inCart ? 'block' : 'none' }}>
        <div id="product-quantity-change__container">
          <button id="decrement-quantity-btn" onClick={decrementQuantity}>-</button>
          <span className="product-thumbnail-quantity">{qty.amount}</span>
          <button id="increment-quantity-btn" onClick={incrementQuantity}>+</button>
        </div>

        <div id="product-quantity-update__container" style={{ display: (item.quantity !== qty.amount) ? 'block' : 'none' }}>
          <button id="product-quantity-update-btn" onClick={handleQuantityUpdate}>Update Quantity</button>
        </div>
      </div>

      <div id="product-thumbnail-quantity-display__container" style={{ display: inCart ? 'none' : 'block' }}>
        <span className="product-thumbnail-quantity">Quantity: {item.quantity}</span>
      </div>
    </div>
  )
}

export default ProductCartDetails;
