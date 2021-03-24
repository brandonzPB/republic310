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
    case 'add_to_cart':
      return state;
    case 'remove_from_cart':
      return state;
    case 'checkout':
      return state;
    case 'update_user':
      return state;
    case 'get_orders':
      return state;
    default:
      return state;
  }
}

export default globalReducer;
