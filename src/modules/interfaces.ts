/// DISPLAY PRODUCT ///
// this is used for display purposes only
export interface DisplayProduct {
  name: string;
  price: number;
  id: string;
  description: string;
  qtySold: number;
  imageUrl?: string;
  alt?: string;
}

// PRODUCT
// product object is created when adding to cart
export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

/// CART INTERFACES ///

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

// COMPLETE CART (once order is placed and date is added)
export interface CompleteCart {
  products: Product[];
  date: Date;
  totalItemCount: number;
  subtotal: number;
  taxes: number;
  total: number;
  id: string;
};

/// USER INTERFACES ///

export interface Address {
  street: string;
  city: string;
  zipCode: string;
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
  _id: string;
  accessToken: string;
  resetCode: string;
  shippingAddress?: Address;
  phoneNumber?: string;
  orderHistory: CompleteCart[];
  initiateDetails: (inputs: any) => void;
  updateShippingAddress: (address: any) => void;
  updatePhoneNumber: (phoneNumber: string) => void;
  updateOrderHistory: (history: CompleteCart[]) => void;
  authorizedUser: () => void;
};

/// GLOBAL CONTEXT STATE ///

export interface State {
  user: User;
  cart: Cart;
  allProducts: DisplayProduct[];
  resetToken: string;
  tempEmail: string;
  updateTempEmail: (email: string) => void;
  createUser: (user: object) => any;
  requestReset: (email: string) => any;
  resetPassword: (password: string, resetCode: string, resetToken: string) => any;
  login: (user: any) => any;
  logout: () => void;
  updateUser: (email: string, phoneNumber: string, userId: string, token: string) => any;
  updateUserPassword: (password: string, userId: string, token: string) => any;
  updateShippingAddress: (shippingObj: Address, userId: string, token: string) => any;
  addToCart: (product: any) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  updateTotalItemCount: (newTotal: number) => void;
  updateSubtotal: (newSubtotal: number) => void;
  removeFromCart: (productId: string) => void;
  updateTaxTotal: (newTotal: number) => void;
  updateTotalCost: (newTotal: number) => void;
  addDateToCart: (date: Date) => void;
  completeOrder: (userId: string, cart: CompleteCart, accessToken: string) => any;
  emailConfirmationToUser: (name: string, id: string, email: string, token: string, cart: CompleteCart) => any;
};

/// PATH CONTEXT ///

export interface Path {
  dest: string;
  product: DisplayProduct;
  changeDest: (dest: string) => void;
  changeProduct: (product: DisplayProduct) => void;
  orderStatus: 'complete' | 'incomplete';
  changeOrderStatus: (newStatus: 'complete' | 'incomplete') => void;
}
