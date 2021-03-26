import React, { useEffect, useReducer, useCallback, createContext } from 'react';
import { useLocalStorage } from 'react-use';
import globalReducer from '../reducers/globalReducer';
import * as interfaces from '../modules/interfaces'
import * as actions from '../modules/actions';
import Cart from '../modules/classes/cart';
import User from '../modules/classes/user';
import Product from '../modules/classes/product';

const initialState: interfaces.State = {
  user: new User(),
  date: undefined,
  cart: new Cart([]),
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
  addToCart: (product: any): void => {},
  removeFromCart: (productId: string): void => {},
  checkout: (): void => {},
};

const LOCAL_STORAGE_KEY: string = 'my-state';

export const GlobalContext = createContext<interfaces.State>(initialState);

const GlobalContextProvider: React.FC = ({ children }) => {
  const usePersistReducer = (): any => {
    const [savedState, saveState] = useLocalStorage(LOCAL_STORAGE_KEY, initialState);

    const reducerLocalStorage = useCallback(
      (state, action) => {
        const newState: any = globalReducer(state, action);

        saveState(newState);

        return newState;
      },
      [saveState],
    )

    return useReducer(reducerLocalStorage, savedState);
  }

  const [state, dispatch] = usePersistReducer();
  
  useEffect(() => {
    console.log(`state`, state);
  }, [state]);

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

  // ADD PRODUCT TO CART
  const addToCart = (product: any): void => {
    const newProduct: interfaces.Product = new Product(product.name, product.quantity, product.price);

    dispatch({ type: 'add_to_cart', payload: newProduct });
  }

  // REMOVE PRODUCT FROM CART
  const removeFromCart = (productId: string): void => {
    dispatch({ type: 'remove_from_cart', payload: productId });
  }

  // CHECKOUT CART
  const checkout = (): void => {
    const date: Date = state.date!;
    
    dispatch({ type: 'checkout', payload: date });
  }

  // I've found that doing the following allows for the functions
  // defined within GlobalContextProvider to be consumed globally.
  // I've yet to find a better way to go about this...
  // (once I do, this will be changed and cleaned up)

  initialState.requestReset = requestReset;
  initialState.postResetCode = postResetCode;
  initialState.resetPassword = resetPassword;
  initialState.login = login;
  initialState.logout = logout;
  initialState.updateUser = updateUser;
  initialState.updateShippingAddress = updateShippingAddress;
  initialState.getOrders = getOrders;
  initialState.addToCart = addToCart;
  initialState.removeFromCart = removeFromCart;
  initialState.checkout = checkout;

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
