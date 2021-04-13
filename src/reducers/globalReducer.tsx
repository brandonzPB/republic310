import * as interfaces from '../modules/interfaces';
import Cart from '../modules/classes/cart';
import { ActionType } from '../modules/actions';

function globalReducer(state: interfaces.State, action: ActionType): typeof state {
  switch(action.type) {
    case 'get_all_products':
      return { ...state, allProducts: action.payload };

    case 'get_reset_token':
      return {
        ...state,
        resetToken: action.payload.resetToken,
        user: {
          ...state.user,
          resetCode: action.payload.resetCode
        }
      };

    case 'reset_password':
      return {
        ...state,
        resetToken: '',
        user: {
          ...state.user,
          password: action.payload
        }
      };

    case 'login':
      return { ...state, resetToken: '', user: action.payload };

    case 'update_user':
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
          phoneNumber: action.payload.phoneNumber
        }
      };

    case 'update_shipping':
      return {
        ...state,
        user: {
          ...state.user,
          shippingAddress: action.payload
        }
      };

    case 'add_to_cart':
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [ ...state.cart.products, action.payload ],

        }
      };

    case 'update_product_quantity':
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [
            ...state.cart.products.map((product: interfaces.Product) => {
              if (product.name === action.payload.productName) {
                return { ...product, quantity: action.payload.newQuantity }
              }

              return product;
            })
          ],
        }
      };

    case 'update_total_item_count':
      return {
        ...state,
        cart: {
          ...state.cart,
          totalItemCount: action.payload
        }
      };

    case 'update_subtotal':
      return {
        ...state,
        cart: {
          ...state.cart,
          subtotal: action.payload
        }
      };

    case 'remove_from_cart':
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [
            ...state.cart.products.filter((item: interfaces.Product) => item.name !== action.payload)
          ]
        }
      };
    
    case 'update_tax_total':
      return {
        ...state,
        cart: {
          ...state.cart,
          taxes: action.payload
        }
      };
    
    case 'update_total_cost':
      return {
        ...state,
        cart: {
          ...state.cart,
          total: action.payload
        }
      };

    case 'add_date_to_cart':
      return {
        ...state,
        cart: {
          ...state.cart,
          date: action.payload
        }
      };

    case 'complete_order':
      return {
        ...state,
        user: {
          ...state.user,
          orderHistory: [action.payload, ...state.user.orderHistory]
        },
        cart: new Cart([]),
      };

    case 'logout':
      return action.payload;

    default:
      console.warn('Invalid action type');
      return state;
  }
}

export default globalReducer;
