import * as interfaces from '../modules/interfaces';

type ACTION_TYPE =
  | { type: 'LOG_IN';            payload: object }
  | { type: 'LOG_OUT'                            }
  | { type: 'ADD_TO_CART';       payload: object }
  | { type: 'REMOVE_FROM_CART'                   }
  | { type: 'UPDATE_USER';       payload: object }
  | { type: 'CHECKOUT';          payload: object }
  | { type: 'GET_ORDER_HISTORY'; payload: object }

const globalReducer = (state: interfaces.State, action: ACTION_TYPE) => {
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
