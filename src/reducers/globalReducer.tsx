import * as interfaces from '../modules/interfaces';
import { ActionType } from '../modules/actions';

function globalReducer(state: interfaces.State, action: ActionType): typeof state {
  switch(action.type) {
    case 'get_all_products':
      state = {
        ...state,
        allProducts: action.payload
      };
      return state;

    case 'get_reset_token':
      state = {
        ...state,
        resetToken: action.payload
      };
      return state;

    case 'login':
      state = {
        ...state,
        resetToken: '',
        user: action.payload
      };
      return state;

    case 'update_user':
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.phoneNumber = action.payload.phoneNumber;
      return state;

    case 'update_shipping':
      state.user.shippingAddress = action.payload;
      return state;

    case 'get_orders':
      state.user.orderHistory = action.payload;
      return state;

    case 'add_to_cart':
      state.cart.products = [...state.cart.products, action.payload];
      state.cart.subtotal = state.cart.calculateSubtotal(state.cart.products);
      return state;

    case 'remove_from_cart':
      state.cart.products = state.cart.products.filter(product => product.id !== action.payload);
      return state;

    case 'checkout':
      state.cart = state.cart.checkout(action.payload);
      return state;

    case 'logout':
      state = action.payload;
      return state;

    default:
      return state;
  }
}

export default globalReducer;
