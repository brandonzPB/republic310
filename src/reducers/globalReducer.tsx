import * as interfaces from '../modules/interfaces';
import { ActionType } from '../modules/actions';

function globalReducer(state: interfaces.State, action:interfaces.Dispatch): interfaces.State {
  const { type, payload } = action;

  switch(type) {
    case ActionType.login:
      return state;
    case ActionType.logout:
      return state;
    case ActionType.addToCart:
      return state;
    case ActionType.removeFromCart:
      return state;
    case ActionType.checkout:
      return state;
    case ActionType.updateUser:
      return state;
    case ActionType.getOrders:
      return state;
    default:
      return state;
  }
}

export default globalReducer;
