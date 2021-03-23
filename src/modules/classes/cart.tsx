import * as interfaces from '../interfaces';
import Product from './product';

class Cart implements interfaces.Cart {
  products: interfaces.Product[];
  subtotal?: number;
  taxes?: number;
  total?: number;
  date: Date;
  
  constructor(products: interfaces.Product[], date: Date = new Date()) {
    this.products = products;
    this.date = date;
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

export default Cart;
