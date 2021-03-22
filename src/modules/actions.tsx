export enum ActionTypes {
  login = 'LOG_IN',
  logout = 'LOG_OUT',
  addToCart = 'ADD_TO_CART',
  removeFromCart = 'REMOVE_FROM_CART',
  checkout = 'CHECKOUT',
  updateUser = 'UPDATE_USER',
  getOrders = 'GET_ORDERS',
};

type ActionType = 
  | { type: ActionTypes.login }
