import axios from 'axios';
import * as interfaces from '../modules/interfaces';

const baseUrl = '/catalog/';

// GET ALL PRODUCTS
export const getAllProducts = (): any => {
  const req: any = axios.get(`${baseUrl}/products`);

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// GET PRODUCT DETAILS
export const getProductDetails = (productId: string): any => {
  const req: any = axios.get(`${baseUrl}/product/${productId}`);

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// UPDATE PRODUCT SALES
export const updateProductSales = (productObj: any, token: string): any => {
  const req = axios.put(`${baseUrl}/product/${productObj._id}/update_sales`, productObj, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}
