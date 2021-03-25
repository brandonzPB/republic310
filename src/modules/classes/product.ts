import * as interfaces from '../interfaces';
const {v4: uuidv4} = require('uuid');

class Product implements interfaces.Product {
  id: number;
  name: string;
  quantity: number;
  price: number;

  constructor(name: string, quantity: number, price: number) {
    this.id = uuidv4();
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }
}

export default Product;
