import * as interfaces from '../modules/interfaces';

type Action = 
  | { type: 'change_dest',         payload: string                    }
  | { type: 'change_product',      payload: interfaces.DisplayProduct }
  | { type: 'change_order_status', payload: 'complete' | 'incomplete' }
  | { type: 'push_to_empty_history',     payload: string                    }
  | { type: 'push_to_existing_history',     payload: string                    }
  | { type: 'traverse_history',    payload: number                    };

export const routeReducer = (state: interfaces.Path, action: Action): typeof state => {
  switch(action.type) {
    case 'change_dest':
      return { ...state, dest: action.payload };

    case 'change_product':
      return { ...state, product: action.payload };

    case 'change_order_status':
      return { ...state, orderStatus: action.payload };

    case 'push_to_empty_history':
      return {
        ...state,
        history: [...state.history, action.payload],
        historyIndex: state.historyIndex + 1
      };

    case 'push_to_existing_history':
      return {
        ...state,
        history: [...state.history.slice(0, state.historyIndex + 1), action.payload],
        historyIndex: state.historyIndex + 1,
      };
      
    default:
      return state;
  }
}