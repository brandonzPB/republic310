import React, { useEffect, useReducer, createContext } from 'react';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces'
import * as actions from '../modules/actions';
import * as productServices from '../services/productServices';
import Cart from '../modules/classes/cart';
import User from '../modules/classes/user';
import Product from '../modules/classes/product';

const LOCAL_STORAGE_KEY: string = 'republic-310-state';
const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);

// const initialState: interfaces.State = storedState
//   ? JSON.parse(storedState)
//   : {
//       user: new User(),
//       date: undefined,
//       cart: new Cart([]),
//       allProducts: [],
//       resetToken: '',
//       createUser: actions.createUser,
//       requestReset: (email: string): any => {},
//       postResetCode: (code: string): void => {},
//       resetPassword: (password: string): any => {},
//       login: (user: object): any => {},
//       logout: (): void => {},
//       updateUser: (update: object): any => {},
//       updateShippingAddress: (address: interfaces.Address): any => {},
//       getOrders: (): any => {},
//       addToCart: (product: any): any => {},
//       updateQuantity: (productId: string, newQuantity: number): void => {},
//       removeFromCart: (productId: string): void => {},
//       checkout: (): void => {},
//     };

const initialState: interfaces.State = {
  user: new User(),
  cart: new Cart([]),
  allProducts: [],
  resetToken: '',
  tempEmail: '',
  updateTempEmail: (email: string): void => {},
  createUser: actions.createUser,
  requestReset: (email: string): any => {},
  resetPassword: (password: string, resetCode: string, resetToken: string): any => {},
  login: (user: any): any => {},
  logout: (): void => {},
  updateUser: (email: string, phoneNumber: string, userId: string, token: string): any => {},
  updateUserPassword: (password: string, userId: string, token: string): any => {},
  updateShippingAddress: (shippingObj: interfaces.Address, userId: string, token: string): any => {},
  addToCart: (product: any): any => {},
  updateQuantity: (productName: string, newQuantity: number): void => {},
  updateTotalItemCount: (newTotal: number): void => {},
  updateSubtotal: (newSubtotal: number): void => {},
  removeFromCart: (productName: string): void => {},
  updateTaxTotal: (newTotal: number): void => {},
  updateTotalCost: (newTotal: number): void => {},
  addDateToCart: (date: Date): void => {},
  completeOrder: (userId: string, cart: interfaces.CompleteCart, accessToken: string): any => {},
  emailConfirmationToUser: (name: string, id: string, email: string, token: string, cart: interfaces.CompleteCart): any => {},
};

export const GlobalContext = createContext<interfaces.State>(initialState);

const GlobalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // GET ALL PRODUCTS FROM DATABASE (only on initial load)
  useEffect(() => {
    console.log('state', state);

    if (state.allProducts.length) return;

    async function getAllProducts(): Promise<void> {
      const allProducts: interfaces.DisplayProduct[] = await actions.getAllProducts();

      dispatch({ type: 'get_all_products', payload: allProducts });
    }

    getAllProducts();
  }, []);

  // SHOW CHANGES TO STATE
  useEffect(() => {
    console.log('state', state);
  }, [state]);
  
  // useEffect(() => {
  //   console.log(`state`, state);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    
  //   initialState.user = state.user;
  //   initialState.cart = state.cart;
  //   initialState.date = state.date;
  //   initialState.resetToken = state.resetToken;
  // }, [state]);

  // UPDATE TEMP EMAIL
  const updateTempEmail = (email: string): void => {
    dispatch({ type: 'update_temp_email', payload: email });
  }

  // REQUEST RESET
  const requestReset = async (email: string): Promise<any> => {
    const requestResult: any = await actions.requestReset(email);

    if (!requestResult || requestResult === 'Error') return 'Error';

    const resetToken: string = requestResult.reset_token;
    const resetCode: string = requestResult.reset_code;

    dispatch({ type: 'get_reset_token', payload: {
      resetToken,
      resetCode
    }});
  }

  // RESET PASSWORD (if reset code is correct)
  const resetPassword = async (password: string, resetCode: string, resetToken: string): Promise<any> => {
    const resetResult: any = await actions.resetPassword(password, resetCode, resetToken);

    if (!resetResult || resetResult === 'Error') return 'Error';

    dispatch({ type: 'reset_password', payload: password });
  }

  // CREATE USER OBJECT (helper called on login; to be added to state)
  const createAuthorizedUser = (password: string, loginResult: any): any => {
    const authorizedUser: interfaces.User = new User();
    
    const details = {
      firstName: loginResult.userToken.first_name,
      lastName: loginResult.userToken.last_name,
      email: loginResult.userToken.email,
      password,
      _id: loginResult.userToken._id,
      accessToken: loginResult.accessToken,
      isAdmin: loginResult.userToken.is_admin,
      admin_code: loginResult.userToken.admin_code,
    };

    authorizedUser.initiateDetails(details);

    const shippingAddress: interfaces.Address = loginResult.userToken.shipping_address;
    const phoneNumber: string = loginResult.userToken.phone_number;
    const orderHistory: interfaces.CompleteCart[] = loginResult.userToken.order_history;

    authorizedUser.updateShippingAddress(shippingAddress);
    authorizedUser.updatePhoneNumber(phoneNumber);
    authorizedUser.updateOrderHistory(orderHistory);
    authorizedUser.authorizedUser();

    return authorizedUser;
  }

  // LOGIN
  const login = async (credentials: any): Promise<any> => { 
    const loginResult: any = await actions.login(credentials);

    if (!loginResult || loginResult === 'Error') return 'Error';

    const authorizedUser = createAuthorizedUser(credentials.password, loginResult);

    dispatch({ type: 'login', payload: authorizedUser });

    return 'Success';
  }

  // LOGOUT
  const logout = (): void => {
    dispatch({ type: 'logout', payload: initialState });
  }

  // UPDATE USER DETAILS (excluding shipping) (returns 'Error' or 'Success')
  const updateUser = async (email: string, phoneNumber: string, userId: string, token: string): Promise<any> => {
    if (state.user === undefined) return;

    const userUpdateObj = { email, phoneNumber, };

    const updateResult: any = await actions.updateUser(userUpdateObj, userId, token);

    if (updateResult === 'Error') return 'Error';

    dispatch({ type: 'update_user', payload: userUpdateObj });

    return 'Success';
  }

  // UPDATE USER PASSWORD (returns boolean)
  const updateUserPassword = async (password: string, userId: string, token: string): Promise<any> => {
    const updateResult: string = await actions.updateUserPassword(password, userId, token);

    if (updateResult === 'Error') return false;

    dispatch({ type: 'reset_password', payload: password });
  }

  // UPDATE SHIPPING DETAILS (returns 'Error' or 'Success')
  const updateShippingAddress = async (shippingObj: interfaces.Address, userId: string, token: string): Promise<any> => {
    const updateResult: any = await actions.updateShipping(shippingObj, userId, token);

    if (updateResult === 'Error') return 'Error';

    dispatch({ type: 'update_shipping', payload: shippingObj });

    return 'Success';
  }

  // UPDATE TOTAL ITEM COUNT (in cart)
  const updateTotalItemCount = (newTotal: number): void => {
    dispatch({ type: 'update_total_item_count', payload: newTotal });
  }

  // UPDATE CART SUBTOTAL
  const updateSubtotal = (newSubtotal: number): void => {
    dispatch({ type: 'update_subtotal', payload: newSubtotal });
  }

  // ADD PRODUCT TO CART
  const addToCart = (product: interfaces.DisplayProduct): any => {
    // creates a product object to be added to our cart
    const newProduct: interfaces.Product = new Product(product.name, 1, product.price, product.id);

    return dispatch({ type: 'add_to_cart', payload: newProduct });
  }

  // INCREASE QUANTITY OF A PRODUCT IN CART
  const updateQuantity = (productName: string, newQuantity: number): void => {
    dispatch({ type: 'update_product_quantity', payload: {
      productName,
      newQuantity,
    }});
  }

  // REMOVE PRODUCT FROM CART
  const removeFromCart = (productName: string): void => {
    dispatch({ type: 'remove_from_cart', payload: productName });
  }

  // UPDATE TOTAL TAX
  const updateTaxTotal = (newTotal: number): void => {
    dispatch({ type: 'update_tax_total', payload: newTotal });
  }

  // UPDATE TOTAL COST
  const updateTotalCost = (newTotal: number): void => {
    dispatch({ type: 'update_total_cost', payload: newTotal });
  }

  // ADD DATE TO CART (called after order is placed)
  const addDateToCart = (date: Date): void => {
    dispatch({ type: 'add_date_to_cart', payload: date });
  }

  // COMPLETE ORDER
  const completeOrder = async (userId: string, cart: interfaces.CompleteCart, accessToken: string): Promise<any> => {
    // adds order to user order history
    const historyUpdateResult: any = await actions.completeOrder(userId, cart, accessToken);

    if (!historyUpdateResult || historyUpdateResult === 'Error') return 'Error';

    // add to user orderHistory and clear cart
    dispatch({ type: 'complete_order', payload: cart });
  }

  // EMAIL CONFIRMATION TO USER
  const emailConfirmationToUser = async (
    userFirstName: string,  
    userId: string,
    userEmail: string, 
    token: string,
    cart: interfaces.CompleteCart): Promise<any> => {
      const emailResult: any = await actions.emailConfirmationToUser(userFirstName, userId, userEmail, token, cart);

      return emailResult;
    }

  // I've found that doing the following allows for the functions
  // defined within GlobalContextProvider to be consumed globally (and correctly).
  // I've yet to find a better way to go about this...
  // (once I do, the following area will be improved upon)

  initialState.updateTempEmail = updateTempEmail;
  initialState.requestReset = requestReset;
  initialState.resetPassword = resetPassword;
  initialState.login = login;
  initialState.logout = logout;
  initialState.updateUser = updateUser;
  initialState.updateUserPassword = updateUserPassword;
  initialState.updateShippingAddress = updateShippingAddress;
  initialState.addToCart = addToCart;
  initialState.updateQuantity = updateQuantity;
  initialState.updateTotalItemCount = updateTotalItemCount;
  initialState.updateSubtotal = updateSubtotal;
  initialState.removeFromCart = removeFromCart;
  initialState.updateTaxTotal = updateTaxTotal;
  initialState.updateTotalCost = updateTotalCost;
  initialState.addDateToCart = addDateToCart;
  initialState.completeOrder = completeOrder;
  initialState.emailConfirmationToUser = emailConfirmationToUser;

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
