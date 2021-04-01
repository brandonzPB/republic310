import * as interfaces from '../interfaces';
import Product from './product';

class Cart implements interfaces.Cart {
  products: interfaces.Product[];
  date?: Date;
  subtotal?: number;
  taxes?: number;
  total?: number;
  length: number;
  addProduct: (product: interfaces.Product) => any;
  calculateSubtotal: (products: interfaces.Product[]) => any;
  calculateTaxTotal: (products: interfaces.Product[]) => any;
  calculateTotal: (products: interfaces.Product[]) => any;
  checkout: (date: Date) => any;
  isProductInCart: (productId: string) => any;
  updateProductQuantity: (productId: string, newQuantity: number) => void;
  
  constructor(products: interfaces.Product[]) {
    this.calculateSubtotal = function(products: interfaces.Product[]): any {
      // without tax
      const subtotal: number = products.reduce((subtotal, product) => subtotal + (product.price * product.quantity), 0);

      return subtotal;
    }

    this.products = products;
    this.length = products.length;
    this.subtotal = this.calculateSubtotal(this.products);

    this.addProduct = function(product: interfaces.Product): any {
      this.products = [...this.products, product];
      this.length += 1;
      
      this.subtotal = this.calculateSubtotal(this.products);
    }

    this.isProductInCart = function(productId: string): any {
      return this.products.findIndex((item: any) => item.id === productId) > -1;
    }

    this.updateProductQuantity = function(productId: string, newQuantity: number): void {
      let prevQuantity: number = 1;

      this.products = this.products.map((product: interfaces.Product) => {
        if (product.id === productId) {
          prevQuantity = product.quantity;

          return {
            ...product,
            quantity: newQuantity
          }
        }

        return product;
      });

      this.length = this.length - prevQuantity + newQuantity;
    }

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
