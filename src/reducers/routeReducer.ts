import * as interfaces from '../modules/interfaces';

type Action = 
  | { type: 'change_dest',         payload: string                    }
  | { type: 'change_product',      payload: interfaces.DisplayProduct }
  | { type: 'change_order_status', payload: 'complete' | 'incomplete' };

export const routeReducer = (state: interfaces.Path, action: Action): typeof state => {
  switch(action.type) {
    case 'change_dest':
      return { ...state, dest: action.payload };

    case 'change_product':
      return { ...state, product: action.payload };

    case 'change_order_status':
      return { ...state, orderStatus: action.payload };
      
    default:
      return state;
  }
}