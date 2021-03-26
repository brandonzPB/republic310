import * as interfaces from './interfaces';
import User from './classes/user';
import Product from './classes/product';
import Cart from './classes/cart';
import * as userService from '../services/userServices';
import * as productService from '../services/productServices';

export type ActionType = 
  | { type: 'get_reset_token',  payload: string             }
  | { type: 'login',            payload: interfaces.User    }
  | { type: 'logout',           payload: interfaces.State   }
  | { type: 'update_user',      payload: any                }
  | { type: 'update_shipping',  payload: interfaces.Address }
  | { type: 'get_orders',       payload: interfaces.Cart[]  }
  | { type: 'add_to_cart',      payload: interfaces.Product }
  | { type: 'remove_from_cart', payload: string             }
  | { type: 'checkout',         payload: Date               }

export const emailIsAvailable = async (email: string): Promise<any> => {
  const emailObj = { email };

  const emailResult: any = await userService.checkEmail(emailObj);

  if (!emailResult || emailResult.result === 'Error') return false;

  return true;
}

export const createUser = async (user: object): Promise<any> => {
  const createResult: any = await userService.createUser(user);

  if (!createResult || createResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const requestReset = async (email: string): Promise<any> => {
  const emailObj: object = { email };

  const requestResult: any = await userService.postResetRequest(emailObj);

  if (!requestResult || requestResult.result !== 'Success') return 'Error';

  return requestResult;
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

  if (!resetResult || resetResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const login = async (credentials: object): Promise<any> => {
  const loginResult: any = await userService.login(credentials);

  if (!loginResult || loginResult.result !== 'Success') return 'Error';

  return loginResult;
}

export const updateUser = async (user: object, userId: string, token: string): Promise<any> => {
  const updateResult: any = await userService.updateUserDetails(user, userId, token);

  if (!updateResult || updateResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const updateShipping = async (user: object, userId: string, token: string): Promise<any> => {
  const updateResult: any = await userService.updateUserShippingDetails(user, userId, token);

  if (!updateResult || updateResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const getOrders = async (userId: string, token: string): Promise<any> => {
  const axiosResult: any = await userService.getOrderHistory(userId, token);

  if (!axiosResult || axiosResult.result !== 'Success') return 'Error';

  return axiosResult;
}

export const addToCart = (): any => {}

export const removeFromCart = (): any => {}

export const checkout = (): any => {}
