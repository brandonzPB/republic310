export type ActionType = 
  | { type: 'login' | 'add_to_cart' | 'remove_from_cart' | 'checkout' | 'update_user' | 'get_orders', payload: object }
  | { type: 'logout' };

export const login = (name: string): void => {
  console.log(`Hello ${name}`);
};
