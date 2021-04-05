/// CART INTERFACES ///

import { ShorthandPropertyAssignment } from "typescript";

// product object is created when adding to cart
export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export interface Cart {
  products: Product[];
  totalItemCount: number;
  date?: Date;
  subtotal: number;
  taxes: number;
  total: number;
  calculateSubtotal: (products: Product[]) => any;
  calculateTaxTotal: () => any;
  calculateTotal: () => any;
};

/// DISPLAY PRODUCT ///

// this is used for display purposes only
export interface DisplayProduct {
  name: string;
  price: number;
  id: string;
  _id: string;
  description: string;
  stock: number;
  imageUrl: string;
  alt?: string;
}

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
  isAuthorized: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  _id?: string;
  accessToken?: string;
  shippingAddress?: Address;
  phoneNumber?: string;
  orderHistory?: Cart[];
  initiateDetails: (inputs: any) => void;
  updateShippingAddress: (address: Address) => void;
  updatePhoneNumber: (phoneNumber: string) => void;
  updateOrderHistory: (history: Cart[]) => void;
  authorizedUser: () => void;
};

/// GLOBAL CONTEXT STATE ///

export interface State {
  user: User;
  date?: Date;
  cart: Cart;
  allProducts: DisplayProduct[];
  resetToken: string;
  createUser: (user: object) => any;
  requestReset: (email: string) => any;
  postResetCode: (code: string) => void;
  resetPassword: (password: string) => any;
  login: (user: object) => any;
  logout: () => void;
  updateUser: (update: object) => any;
  updateShippingAddress: (address: Address) => any;
  getOrders: () => any;
  addToCart: (product: any) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  updateTotalItemCount: (newTotal: number) => void;
  updateSubtotal: (newSubtotal: number) => void;
  removeFromCart: (productId: string) => void;
  updateTaxTotal: (newTotal: number) => void;
  updateTotalCost: (newTotal: number) => void;
  checkout: () => void;
};

/// PATH CONTEXT ///

export interface Path {
  dest: string;
  product: DisplayProduct;
  changeDest: (dest: string) => void;
  changeProduct: (product: DisplayProduct) => void;
}
