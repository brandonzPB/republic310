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
  date: Date;
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
  createUser: (user: object) => void;
  requestReset: (email: string) => void;
  postResetCode: (code: string) => void;
  resetPassword: (password: string) => void;
  login: (user: object) => void;
  logout: () => void;
  addToCart: (product: object) => void;
  removeFromCart: (product: object) => void;
  checkout: (cart: object) => void;
  updateUser: (user: object) => void;
  updateShipping: () => void;
  getOrders: () => void;
};
