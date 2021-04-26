import * as interfaces from '../interfaces';
const {v4: uuidv4} = require('uuid');

class Product implements interfaces.Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;

  constructor(name: string, quantity: number, price: number, id: string, imageUrl: string) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.id = id;
    this.imageUrl = imageUrl;
  }
}

export default Product;
