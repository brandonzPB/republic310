import * as interfaces from './interfaces';
import Product from './product';

export default class Cart implements interfaces.Cart {
  products: interfaces.Product[];
  subtotal?: number;
  taxes?: number;
  total?: number;
  
  constructor(products: interfaces.Product[] = []) {
    this.products = products;
  }

  addProductToCart() {}

  removeProductFromCart() {}

  calculateSubtotal() {}

  getSubtotal() {}

  calculateTaxTotal() {}

  getTaxTotal() {}

  calculateTotal() {}

  getTotal() {}
}
