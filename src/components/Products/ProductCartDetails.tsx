import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import * as types from '../../modules/types';
import * as interfaces from '../../modules/interfaces';

type CartProduct = {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  alt: string;
  inCart: boolean;
};

const ProductCartDetails: React.FC<CartProduct> = ({ name, price, quantity, imageUrl, alt, inCart }: CartProduct) => {
  const { cart, updateTotalItemCount, updateQuantity, removeFromCart, allProducts, updateSubtotal } = useContext(GlobalContext);

  const { dest, changeDest, changeProduct } = useContext(RouteContext);

  const [qty, setQty] = useState({ amount: quantity });

  const getCartItemTotal = (): any => {
    return cart.products.reduce((count, item) => { return count + item.quantity }, 0);
  }

  const updateCartCount = (): any => {
    let cartItemTotal: number = getCartItemTotal();

    updateTotalItemCount(cartItemTotal - quantity + qty.amount);
  }

  const updateCartSubtotal = (productPrice: number): any => {
    let cartSubtotal: number = cart.subtotal;
    
    // decrease subtotal (of previous quantity)
    cartSubtotal -= productPrice * quantity;
    
    // increase subtotal
    return updateSubtotal(cartSubtotal + (productPrice * qty.amount));
  }

  const handleQuantityUpdate = (): any => {
    updateCartCount();

    updateCartSubtotal(price);

    if (qty.amount === 0) {
      return removeFromCart(name);
    }

    return updateQuantity(name, qty.amount);
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
    const productDetails: interfaces.DisplayProduct = getProductDetails(name);
    
    changeProduct(productDetails);

    changeDest('/product/details');
  }

  return (
    <div id="product-thumbnail__container">
      <div id="product-thumbnail-name__container">
        <span id="product-thumbnail-name">{name}</span>
      </div>

      <div id="product-thumbnail-image__container">
        <img src={imageUrl} alt={alt} id="product-thumbnail-image" />

        <button id="product-thumbnail-view-btn" onClick={handleNav}>View Details</button>
      </div>

      <div id="product-thumbnail-price__container">
        <span id="product-thumbnail-price">${price}.00</span>
      </div>

      <div id="product-thumbnail-quantity-change__container" style={{ display: inCart ? 'block' : 'none' }}>
        <div id="product-quantity-change__container">
          <button id="decrement-quantity-btn" onClick={decrementQuantity}>-</button>
          <span className="product-thumbnail-quantity">{qty.amount}</span>
          <button id="increment-quantity-btn" onClick={incrementQuantity}>+</button>
        </div>

        <div id="product-quantity-update__container" style={{ display: (quantity !== qty.amount) ? 'block' : 'none' }}>
          <button id="product-quantity-update-btn" onClick={handleQuantityUpdate}>Update Quantity</button>
        </div>
      </div>

      <div id="product-thumbnail-quantity-display__container" style={{ display: inCart ? 'none' : 'block' }}>
        <span className="product-thumbnail-quantity">Quantity: {quantity}</span>
      </div>
    </div>
  )
}

export default ProductCartDetails;
