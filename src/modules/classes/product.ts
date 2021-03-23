import * as interfaces from '../interfaces';
const {v4: uuidv4} = require('uuid');

class Product implements interfaces.Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  isTaxed: boolean;

  constructor(name: string, quantity: number, price: number, isTaxed: boolean) {
    this.id = uuidv4();
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.isTaxed = isTaxed;
  }
}

export default Product;
