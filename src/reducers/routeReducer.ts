import * as interfaces from '../modules/interfaces';

type Action = 
  | { type: 'change_dest',    payload: string                    }
  | { type: 'change_product', payload: interfaces.DisplayProduct };

export const routeReducer = (state: interfaces.Path, action: Action): typeof state => {
  switch(action.type) {
    case 'change_dest':
      state = { ...state, dest: action.payload };
      return state;

    case 'change_product':
      state = { ...state, product: action.payload };
      return state;
      
    default:
      return state;
  }
}