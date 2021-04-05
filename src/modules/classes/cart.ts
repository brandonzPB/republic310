import * as interfaces from '../interfaces';

class Cart implements interfaces.Cart {
  products: interfaces.Product[];
  totalItemCount: number;
  date?: Date;
  subtotal: number;
  taxes: number;
  total: number;
  calculateSubtotal: (products: interfaces.Product[]) => any;
  calculateTaxTotal: () => any;
  calculateTotal: () => any;
  
  constructor(products: interfaces.Product[]) {
    this.calculateSubtotal = function(products: interfaces.Product[]): any {
      if (!products.length) return 0;
      
      // without tax
      const subtotal: number = products.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);

      return subtotal;
    }

    this.totalItemCount = 0;
    this.products = products;
    this.subtotal = this.calculateSubtotal(this.products);
    this.taxes = 0;
    this.total = 0;

    this.calculateTaxTotal = function(): any {
      const subtotal: number = this.calculateSubtotal(this.products);

      const taxes: number = subtotal * 0.2225;

      return taxes;
    }

    this.calculateTotal = function(): any {
      const total: number = this.products.reduce((total, product) => total + (product.price * product.quantity * 1.2225), 0);

      return total;
    }
  }
}

export default Cart;
