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
  isAuthorized: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  _id?: string;
  accessToken?: string;
  shippingAddress?: Address;
  phoneNumber?: number;
  orderHistory?: Cart[];
  initiateDetails: (inputs: any) => void;
  updateShippingAddress: (address: Address) => void;
  updatePhoneNumber: (phoneNumber: number) => void;
  updateOrderHistory: (history: Cart[]) => void;
};

/// STATE INTERFACE ///

export interface State {
  user: User;
  cart: Cart;
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
  removeFromCart: (product: any) => void;
  checkout: (cart: any) => void;
};
