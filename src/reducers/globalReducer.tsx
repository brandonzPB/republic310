import * as interfaces from '../modules/interfaces';
import { ActionType } from '../modules/actions';

function globalReducer(state: interfaces.State, action: ActionType): interfaces.State {
  switch(action.type) {
    case 'get_reset_token':
      state.resetToken = action.payload;
      return state;

    case 'login':
      state.resetToken = '';
      state.user = action.payload;
      return state;

    case 'logout':
      state = action.payload;
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
      state.cart = state.cart.addProduct(action.payload);
      return state;

    case 'remove_from_cart':
      return state;

    case 'checkout':
      return state;

    default:
      return state;
  }
}

export default globalReducer;
