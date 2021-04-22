import * as interfaces from './interfaces';

export const getProductDetails = (productName: string, allProducts: interfaces.DisplayProduct[]): any => {
  const productDetails: interfaces.DisplayProduct = allProducts
    .find((product: interfaces.DisplayProduct) => product.name === productName)!;

  return productDetails;
};

export const getProductInCart = (productName: string, cart: interfaces.Cart): any => {
  return cart.products.find((item: interfaces.Product) => item.name === productName);
};

export const getCartItemTotal = (cart: interfaces.Cart): any => {
  return cart.products.reduce((count, item) => { return count + item.quantity }, 0);
};

