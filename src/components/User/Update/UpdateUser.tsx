import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import UserUpdateForm from './UserUpdateForm';
import './updateUser.css';

const UpdateUser: React.FC = () => {
  const { user, updateUser, updateShippingAddress } = useContext(GlobalContext);

  const { dest } = useContext(RouteContext);
  
  // CHECK IF EMAIL IS AVAILABLE
  const emailIsAvailable = async (): Promise<any> => {}

  // HANDLE SHIPPING UPDATE
  const handleShippingUpdate = async (data: any): Promise<any> => {
    const street: string = data.street;
    const city: string = data.city;
    const zipCode: string = data.zipCode;
    const state: string = data.state;
    const country: string = data.country;

    const updateResult: string = await updateShippingAddress(street, city, zipCode, state, country);
    return updateResult === 'Success';
  }

  // HANDLE USER UPDATE (everything except shipping)
  const handleUserUpdate = async (data: any): Promise<any> => {
    const email: string = data.email;
    const phoneNumber: string = data.phoneNumber;

    const updateResult: string = await updateUser(email, phoneNumber);
    return updateResult === 'Success';
  }

  // CHECK IF PASSWORD IS CORRECT
  const isCorrectPassword = (password: string): any => {
    return password === user.password;
  } 

  return (
    <>
      {
        dest === '/user/update'
          ? <UserUpdateForm 
            isCorrectPassword={isCorrectPassword}
            emailIsAvailable={emailIsAvailable}
            handleShippingUpdate={handleShippingUpdate}
            handleUserUpdate={handleUserUpdate}
          />
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
