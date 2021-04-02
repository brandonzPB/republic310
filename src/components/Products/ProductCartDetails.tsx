import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import * as types from '../../modules/types';

type CartProduct = {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  alt: string;
};

const ProductCartDetails: React.FC<CartProduct> = ({ name, price, quantity, imageUrl, alt }: CartProduct) => {
  const { cart, updateTotalItemCount, updateQuantity, removeFromCart } = useContext(GlobalContext);

  const [qty, setQty] = useState({ amount: quantity });

  const getCartItemTotal = (): any => {
    return cart.products.reduce((count, item) => { return count + item.quantity }, 0);
  }

  const updateCartCount = (): any => {
    let cartItemTotal: number = getCartItemTotal();

    updateTotalItemCount(cartItemTotal - quantity + qty.amount);
  }

  const handleQuantityUpdate = (): any => {
    updateCartCount();

    if (qty.amount === 0) {
      return removeFromCart(name);
    }

    return updateQuantity(name, qty.amount);
  }

  const decrementQuantity = (): void => {
    setQty({
      ...qty,
      amount: qty.amount - 1
    });
  }

  const incrementQuantity = (): void => {
    setQty({
      ...qty,
      amount: qty.amount + 1
    });
  }

  return (
    <div id="product-thumbnail__container">
      <div id="product-thumbnail-name__container">
        <span id="product-thumbnail-name">{name}</span>
      </div>

      <div id="product-thumbnail-image__container">
        <img src={imageUrl} alt={alt} id="product-thumbnail-image" />
      </div>

      <div id="product-thumbnail-price__container">
        <span id="product-thumbnail-price">{price}</span>
      </div>

      <div id="product-thumbnail-quantity__container">
        <div id="product-quantity-change__container">
          <button id="decrement-quantity-btn" onClick={decrementQuantity}>-</button>
          <span id="product-thumbnail-quantity">{qty.amount}</span>
          <button id="increment-quantity-btn" onClick={incrementQuantity}>+</button>
        </div>

        <div id="product-quantity-update__container" style={{ display: (quantity !== qty.amount) ? 'block' : 'none' }}>
          <button id="product-quantity-update-btn" onClick={handleQuantityUpdate}>Update Quantity</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCartDetails;
