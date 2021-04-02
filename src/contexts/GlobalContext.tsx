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
  date: undefined,
  cart: new Cart([]),
  allProducts: [],
  resetToken: '',
  createUser: actions.createUser,
  requestReset: (email: string): any => {},
  postResetCode: (code: string): void => {},
  resetPassword: (password: string): any => {},
  login: (user: object): any => {},
  logout: (): void => {},
  updateUser: (update: object): any => {},
  updateShippingAddress: (address: interfaces.Address): any => {},
  getOrders: (): any => {},
  addToCart: (product: any): any => {},
  updateQuantity: (productName: string, newQuantity: number): void => {},
  updateTotalItemCount: (newTotal: number): void => {},
  removeFromCart: (productName: string): void => {},
  checkout: (): void => {},
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

  // REQUEST RESET
  const requestReset = async (email: string): Promise<any> => {
    const requestResult: any = await actions.requestReset(email);

    if (!requestResult || requestResult === 'Error') return 'Error';

    dispatch({ type: 'get_reset_token', payload: requestResult.result.reset_token });
  }

  // POST RESET CODE (if request is successful)
  const postResetCode = (code: string): void => {
    // pass in token from state to actions.postResetCode
    actions.postResetCode(code, state.resetToken);
  }

  // RESET PASSWORD (if reset code is correct)
  const resetPassword = async (password: string): Promise<any> => {
    const resetResult: any = await actions.resetPassword(password, state.resetToken);

    if (!resetResult || resetResult === 'Error') return 'Error';

    return 'Success';
  }

  // CREATE USER OBJECT (to be added to state)
  const createUserState = (loginResult: any): any => {
    const authorizedUser: interfaces.User = new User();

    const details = {
      firstName: loginResult.userToken.firstName,
      lastName: loginResult.userToken.lastName,
      email: loginResult.userToken.email,
      password: loginResult.userToken.password,
      _id: loginResult.userToken._id,
      accessToken: loginResult.accessToken
    };

    authorizedUser.initiateDetails(details);

    const shippingAddress: interfaces.Address = loginResult.userToken.shipping_address;
    const phoneNumber: number = loginResult.phone_number;

    authorizedUser.updateShippingAddress(shippingAddress);
    authorizedUser.updatePhoneNumber(phoneNumber);

    return authorizedUser;
  }

  // LOGIN
  const login = async (credentials: object): Promise<any> => { 
    const loginResult: any = await actions.login(credentials);

    if (!loginResult || loginResult === 'Error') return 'Error';

    const authorizedUser = createUserState(loginResult);

    dispatch({ type: 'login', payload: authorizedUser });

    return 'Success';
  }

  // LOGOUT
  const logout = (): void => {
    dispatch({ type: 'logout', payload: initialState });
  }

  // UPDATE USER DETAILS (excluding shipping)
  const updateUser = async (update: any): Promise<any> => {
    if (state.user === undefined) return;

    const user = {
      firstName: update.firstName.trim() || state.user.firstName,
      lastName: update.lastName.trim() || state.user.lastName,
      email: update.email.trim() || state.user.email,
      password: update.password.trim() || state.user.password,
      phoneNumber: update.phoneNumber.trim() || state.user.phoneNumber,
      updatePassword: !!update.password.trim()
    };

    const userId: string = state.user._id!;
    const accessToken: string = state.user.accessToken!;

    const updateResult: any = await actions.updateUser(user, userId, accessToken);

    if (updateResult === 'Error') return 'Error';

    dispatch({ type: 'update_user', payload: user });
  }

  // UPDATE SHIPPING DETAILS
  const updateShippingAddress = async (address: interfaces.Address): Promise<any> => {
    const userId: string = state.user._id!;
    const accessToken: string = state.user.accessToken!;

    const user: object = { shippingAddress: address };

    const updateResult: any = await actions.updateShipping(user, userId, accessToken);

    if (updateResult === 'Error') return 'Error';

    dispatch({ type: 'update_shipping', payload: address });
  }

  // GET ORDER HISTORY
  const getOrders = async (): Promise<any> => {
    const userId: string = state.user._id!;
    const accessToken: string = state.user.accessToken!;

    const axiosResult: any = await actions.getOrders(userId, accessToken);

    if (axiosResult === 'Error') return 'Error';

    dispatch({ type: 'get_orders', payload: axiosResult.orders });
  }

  // UPDATE TOTAL ITEM COUNT (in cart)
  const updateTotalItemCount = (newTotal: number): void => {
    dispatch({ type: 'update_total_item_count', payload: newTotal });
  }

  // ADD PRODUCT TO CART
  const addToCart = (product: any): any => {
    const newProduct: interfaces.Product = new Product(product.name, 1, product.price);

    return dispatch({ type: 'add_to_cart', payload: newProduct });
  }

  // INCREASE QUANTITY OF A PRODUCT IN CART
  const updateQuantity = (productName: string, newQuantity: number): void => {
    dispatch({ type: 'update_product_quantity', payload: {
      productName,
      newQuantity
    }});
  }

  // REMOVE PRODUCT FROM CART
  const removeFromCart = (productName: string): void => {
    dispatch({ type: 'remove_from_cart', payload: productName });
  }

  // CHECKOUT CART
  const checkout = (): void => {
    const date: Date = state.date!;
    
    dispatch({ type: 'checkout', payload: date });
  }

  // I've found that doing the following allows for the functions
  // defined within GlobalContextProvider to be consumed globally (and correctly).
  // I've yet to find a better way to go about this...
  // (once I do, the following area will be improved upon)

  initialState.requestReset = requestReset;
  initialState.postResetCode = postResetCode;
  initialState.resetPassword = resetPassword;
  initialState.login = login;
  initialState.logout = logout;
  initialState.updateUser = updateUser;
  initialState.updateShippingAddress = updateShippingAddress;
  initialState.getOrders = getOrders;
  initialState.addToCart = addToCart;
  initialState.updateQuantity = updateQuantity;
  initialState.updateTotalItemCount = updateTotalItemCount;
  initialState.removeFromCart = removeFromCart;
  initialState.checkout = checkout;

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
