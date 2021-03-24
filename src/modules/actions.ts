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

export const createUser = async (user: object): Promise<any> => {
  const createResult: any = await userService.createUser(user);

  if (!createResult || createResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const requestReset = async (email: string): Promise<any> => {
  const emailObj: object = { email };

  const requestResult: any = await userService.postResetRequest(emailObj);

  if (!requestResult || requestResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const postResetCode = async (code: string, token: string): Promise<any> => {
  const codeObj: object = { code };

  const resetResult: any = await userService.postResetCode(codeObj, token);

  if (!resetResult || resetResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const resetPassword = async (password: string, token: string): Promise<any> => {
  const passwordObj: object = { password };

  const resetResult: any = await userService.resetPassword(passwordObj, token);

  if (!resetResult || resetResult !== 'Success') return 'Error';

  return 'Success';
}

export const login = (user: object): any => {
}

export const logout = (): any => {}

export const addToCart = (): any => {}

export const removeFromCart = (): any => {}

export const checkout = (): any => {}

export const updateUser = (): any => {}

export const updateShipping = (): any => {}

export const getOrders = (): any => {}
