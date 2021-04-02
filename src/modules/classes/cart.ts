import * as interfaces from '../interfaces';

class Cart implements interfaces.Cart {
  products: interfaces.Product[];
  totalItemCount: number;
  date?: Date;
  subtotal?: number;
  taxes?: number;
  total?: number;
  calculateSubtotal: (products: interfaces.Product[]) => any;
  calculateTaxTotal: (products: interfaces.Product[]) => any;
  calculateTotal: (products: interfaces.Product[]) => any;
  checkout: (date: Date) => any;
  
  constructor(products: interfaces.Product[]) {
    this.calculateSubtotal = function(products: interfaces.Product[]): any {
      // without tax
      const subtotal: number = products.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);

      return subtotal;
    }

    this.totalItemCount = 0;
    this.products = products;
    this.subtotal = this.calculateSubtotal(this.products);

    this.calculateTaxTotal = function(products: interfaces.Product[]): any {
      const subtotal: number = this.calculateSubtotal(this.products);

      const taxes: number = subtotal * 0.2225;

      return taxes;
    }

    this.calculateTotal = function(products: interfaces.Product[]): any {
      const total: number = products.reduce((total, product) => total + (product.price * product.quantity * 1.2225), 0);

      return total;
    }

    this.checkout = function(date: Date): any {
      this.date = date;
      this.taxes = this.calculateTaxTotal(this.products);
      this.total = this.calculateTotal(this.products);
    }
  }
}

export default Cart;
