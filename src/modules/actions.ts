import * as interfaces from './interfaces';
import User from './classes/user';
import Product from './classes/product';
import Cart from './classes/cart';

export type ActionType = 
  | { type: 'login',            payload: interfaces.User    }
  | { type: 'logout'                                        }
  | { type: 'add_to_cart',      payload: interfaces.Product }
  | { type: 'remove_from_cart', payload: interfaces.Product }
  | { type: 'checkout',         payload: interfaces.Cart    }
  | { type: 'update_user',      payload: interfaces.User    }
  | { type: 'get_orders',       payload: interfaces.Cart[]  }

export const login = () => {}

export const logout = () => {}

export const addToCart = () => {}

export const removeFromCart = () => {}

export const checkout = () => {}

export const updateUser = () => {}

export const getOrders = () => {}
