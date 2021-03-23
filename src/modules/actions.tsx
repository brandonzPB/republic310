import * as interfaces from './interfaces';
import User from './classes/user';

export type ActionType = 
  | { type: 'login',            payload: interfaces.User    }
  | { type: 'logout'                                        }
  | { type: 'add_to_cart',      payload: interfaces.Product }
  | { type: 'remove_from_cart', payload: interfaces.Product }
  | { type: 'checkout',         payload: interfaces.Cart    }
  | { type: 'update_user',      payload: interfaces.User    }
  | { type: 'get_orders',       payload: interfaces.Cart[]  }

export const login = (name: string): void => {
  console.log(`Hello ${name}`);
};

export const logout = () => {
  console.log('logout')
};

export const addToCart = () => {
  console.log('add to cart');
};

export const removeFromCart = () => {}

export const checkout = () => {}

export const updateUser = () => {}

export const getOrders = () => {}
