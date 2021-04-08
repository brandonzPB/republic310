import * as interfaces from './interfaces';
import * as userService from '../services/userServices';
import * as productService from '../services/productServices';

export type ActionType = 
  | { type: 'get_all_products',           payload: interfaces.DisplayProduct[] }
  | { type: 'get_reset_token',            payload: string                      }
  | { type: 'login',                      payload: interfaces.User             }
  | { type: 'logout',                     payload: interfaces.State            }
  | { type: 'update_user',                payload: any                         }
  | { type: 'update_shipping',            payload: interfaces.Address          }
  | { type: 'add_to_cart',                payload: interfaces.Product          }
  | { type: 'update_product_quantity',    payload: any                         }
  | { type: 'update_total_item_count',    payload: number                      }
  | { type: 'update_subtotal',            payload: number                      }
  | { type: 'remove_from_cart',           payload: string                      }
  | { type: 'update_tax_total',           payload: number                      }
  | { type: 'update_total_cost',          payload: number                      }
  | { type: 'add_date_to_cart',           payload: Date                        }
  | { type: 'complete_order',             payload: interfaces.CompleteCart     }

const getProductDetailArray = (products: any): any => {
  const productArray: interfaces.DisplayProduct[] = products.map((product: any) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      id: product.id,
      _id: product._id,
    }
  });

  return productArray;
}

export const getAllProducts = async (): Promise<any> => {
  const axiosResult: any = await productService.getAllProducts();

  if (!axiosResult) { return 'Error' }

  const productArray: interfaces.DisplayProduct[] = getProductDetailArray(axiosResult);

  return productArray;
}

export const emailIsAvailable = async (email: string): Promise<any> => {
  const emailObj = { email };

  const emailResult: any = await userService.checkEmail(emailObj);

  // email is not available
  if (!emailResult || emailResult.result === 'Error') return false;

  // email is available
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

export const addToCart = (): any => {}

export const removeFromCart = (): any => {}

export const completeOrder = async (userId: string, cart: interfaces.CompleteCart, token: string): Promise<any> => {
  const updateResult: any = await userService.postOrder(userId, cart, token);

  if (!updateResult || updateResult.result !== 'Success') return 'Error';

  return 'Success';
}
