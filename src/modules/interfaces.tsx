import { ActionType } from './actions';

/// CART INTERFACES ///

// product object is created when adding to cart
export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  isTaxed: boolean;
};

export interface Cart {
  products: Product[];
  subtotal?: number;
  taxes?: number;
  total?: number;
};

/// USER INTERFACES ///

export interface Address {
  street: string;
  city: string;
  zipCode: number;
  state: string;
  country: string;
};

// user object is created when logging in
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
  resetCode?: string;
  shippingAddress?: Address;
  phoneNumber?: number;
  orderHistory?: Cart[];
};

/// STATE INTERFACE ///

export interface State {
  user?: User;
  cart: Cart;
};

/// DISPATCH INTERFACE ///

export interface Dispatch {
  type: ActionType;
  payload?: any;
};
