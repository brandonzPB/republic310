import * as interfaces from '../modules/interfaces';

const globalReducer = (state: interfaces.State, action: interfaces.Dispatch) => {
  switch(action.type) {
    case 'LOG_IN':
      return state;
      break;
    case 'LOG_OUT':
      return state;
      break;
    case 'ADD_TO_CART':
      return state;
      break;
    case 'REMOVE_FROM_CART':
      return state;
      break;
    case 'UPDATE_USER':
      return state;
      break;
    case 'CHECKOUT':
      return state;
      break;
    case 'GET_ORDER_HISTORY':
      return state;
      break;
    default:
      return state;
  }
}

export default globalReducer;
