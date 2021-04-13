import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as actions from '../../../modules/actions';
import * as interfaces from '../../../modules/interfaces';
import UserUpdateForm from './UserUpdateForm';
import './updateUser.css';

const UpdateUser: React.FC = () => {
  const { user, updateUser, updateShippingAddress } = useContext(GlobalContext);

  const { dest } = useContext(RouteContext);

  const [loading, setLoading] = useState(false);

  // HANDLE SHIPPING UPDATE
  const handleShippingUpdate = async (data: any): Promise<any> => {
    const street: string = data.street;
    const city: string = data.city;
    const zipCode: string = data.zipCode;
    const state: string = data.state;
    const country: string = data.country;

    // if each input is exactly the same as
    // what already exists in the database, then
    // we'll skip the server call (nothing to update)

    if (user.shippingAddress) {
      if (user.shippingAddress.street === street && user.shippingAddress.city === city) {
        if (user.shippingAddress.zipCode === zipCode && user.shippingAddress.state === state) {
          if (user.shippingAddress.country === country) {
            return true;
          }
        }
      }
    }

    const userId: string = user._id!;
    const token: string = user.accessToken!;
    
    const shippingObj: interfaces.Address = {
      street,
      city,
      zipCode,
      state,
      country
    };

    const updateResult: string = await updateShippingAddress(shippingObj, userId, token);

    console.log('updateResult', updateResult);
    return updateResult === 'Success';
  }

  // HANDLE USER UPDATE (everything except shipping)
  const handleUserUpdate = async (data: any): Promise<any> => {
    const email: string = data.email;
    const phoneNumber: string = data.phoneNumber;

    // if each input is exactly the same as what
    // already exists on the database, then
    // we'll skip the server call (nothing to update)

    if (user.email === email && user.phoneNumber === phoneNumber) {
      return true;
    }

    const userId: string = user._id!;
    const token: string = user.accessToken!;

    const updateResult: string = await updateUser(email, phoneNumber, userId, token);
    return updateResult === 'Success';
  }

  // CHECK IF EMAIL IS AVAILABLE
  const emailIsAvailable = async (email: string): Promise<any> => {
    return (email === user.email) || await actions.emailIsAvailable(email);
  }

  // CHECK IF PASSWORD IS CORRECT
  const isCorrectPassword = async (password: string): Promise<any> => {
    const userId: string = user._id!;
    const token: string = user.accessToken!;

    return await actions.comparePasswords(password, userId, token);
  } 

  return (
    <>
      {
        dest === '/user/update'
          ? <>
            {
              loading
                ? <div id="user-update-loading__container">
                  <span id="user-update-loading-text">Success! Returning to index...</span>
                </div>
                : <UserUpdateForm 
                  isCorrectPassword={isCorrectPassword}
                  emailIsAvailable={emailIsAvailable}
                  handleShippingUpdate={handleShippingUpdate}
                  handleUserUpdate={handleUserUpdate}
                  setLoading={setLoading}
                />
            }
          </>
          : !dest
            ? <Route exact path="/user/update">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/user/update">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default UpdateUser;
