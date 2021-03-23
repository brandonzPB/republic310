import axios from 'axios';

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
