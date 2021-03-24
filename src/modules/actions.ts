import * as interfaces from './interfaces';
import User from './classes/user';
import Product from './classes/product';
import Cart from './classes/cart';
import * as userService from '../services/userServices';
import * as productService from '../services/productServices';

export type ActionType = 
  | { type: 'login',            payload: interfaces.User    }
  | { type: 'logout'                                        }
  | { type: 'add_to_cart',      payload: interfaces.Product }
  | { type: 'remove_from_cart', payload: interfaces.Product }
  | { type: 'checkout',         payload: interfaces.Cart    }
  | { type: 'update_user',      payload: interfaces.User    }
  | { type: 'update_shipping',  payload: interfaces.Address }
  | { type: 'get_orders',       payload: interfaces.Cart[]  }

export const createUser = (user: object): void => {}

export const requestReset = (email: string): any => {}

export const postResetCode = (code: string, token: string): any => {}

export const resetPassword = (password: string, token: string): any => {}

export const login = (user: object): any => {
}

export const logout = (): any => {}

export const addToCart = (): any => {}

export const removeFromCart = (): any => {}

export const checkout = (): any => {}

export const updateUser = (): any => {}

export const updateShipping = (): any => {}

export const getOrders = (): any => {}
