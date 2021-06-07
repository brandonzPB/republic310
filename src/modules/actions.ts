import * as interfaces from './interfaces';
import * as userService from '../services/userServices';
import * as productService from '../services/productServices';
import { getProductDescription } from './productMethods';

export type ActionType = 
  | { type: 'get_all_products',           payload: interfaces.DisplayProduct[] }
  | { type: 'update_temp_email',          payload: string                      }
  | { type: 'get_reset_token',            payload: any                         }
  | { type: 'reset_password',             payload: string                      }
  | { type: 'login',                      payload: interfaces.User             }
  | { type: 'logout',                     payload: interfaces.State            }
  | { type: 'update_user',                payload: any                         }
  | { type: 'update_password',            payload: string                      }
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
    const description: string = getProductDescription(product.name);

    return {
      name: product.name,
      description,
      price: product.price,
      qtySold: product.qty_sold,
      _id: product._id,
      imageUrl: product.image_url,
      alt: product.description
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

export const resetPassword = async (password: string, resetCode: string, token: string): Promise<any> => {
  const userObj: object = { resetCode, password };

  const resetResult: any = await userService.resetPassword(userObj, token);

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

export const comparePasswords = async (password: string, userId: string, token: string): Promise<any> => {
  // returns false if passwords don't match
  const userObj: object = { password };

  const checkResult: any = await userService.comparePasswords(userObj, userId, token);

  if (!checkResult || checkResult.result !== 'Success') return false;

  return true;
}

export const updateUserPassword = async (password: string, userId: string, token: string): Promise<any> => {
  const userObj: object = { password };

  const updateResult: any = await userService.updateUserPassword(userObj, userId, token);

  if (!updateResult || updateResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const updateShipping = async (shippingObj: interfaces.Address, userId: string, token: string): Promise<any> => {
  const updateResult: any = await userService.updateUserShippingDetails(shippingObj, userId, token);

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

export const emailConfirmationToUser = async (userObj: any, token: string): Promise<any> => {
    const emailResult: any = await userService.emailConfirmationToUser(userObj, token);

    if (!emailResult || emailResult.result === 'Error') return 'Error';

    return 'Success';
}

export const updateProductSales = async (productObj: any, productId: string, token: string): Promise<any> => {
  const updateResult: any = await productService.updateProductSales(productObj, productId, token);

  if (!updateResult || updateResult.result !== 'Success') return 'Error';

  return 'Success';
}

export const verifyAdmin = async (credentials: any, token: string): Promise<any> => {
  const verificationResult: any = await userService.verifyAdmin(credentials, token);

  if (!verificationResult || verificationResult.result !== 'Success') return 'Error';

  return 'Success';
}
