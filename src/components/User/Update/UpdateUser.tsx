import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './updateUser.css';

interface UpdateForm {
  email: string;
  password: string;
  phoneNumber: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
};

const UpdateUser: React.FC = () => {
  const { user, updateUser, updateShippingAddress } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const { register, handleSubmit, errors } = useForm<UpdateForm>();

  if (dest === 'userInfo') {
    return (
      <Route exact path="/user/update">
        <Redirect to="/user/info" />
      </Route>
    )
  }

  if (dest === 'cart') {
    return (
      <Route exact path="/user/update/details">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/user/update/details">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/user/update/details">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/user/update/details">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'index' || dest !== 'userUpdate') {
    return (
      <Route exact path="/user/update/details">
        <Redirect to="/" />
      </Route>
    )
  }
  
  // CHECK IF EMAIL IS AVAILABLE
  const isAvailable = async (): Promise<any> => {}

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

  // SUBMIT UPDATE FORM
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);
  }

  // CHECK IF PASSWORD IS CORRECT
  const isCorrectPassword = (password: string) => {
    return password === user.password;
  } 

  return (
    <div id="user-update__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          style={{ backgroundColor: errors.email ? 'pink' : 'white' }}
          className="update-input"
          id="update-email-input"
          type="email"
          name="email"
          defaultValue={ user.email ? user.email : '' }
          ref={register({ required: false, validate: isAvailable })}
        />

        {errors.email && errors.email.type === 'validate' && (
          <div style={{ color: 'red' }}>Email is already in use</div>
        )}

        <input 
          style={{ backgroundColor: errors.phoneNumber ? 'pink' : 'white' }}
          className="update-input"
          id="update-phone-input"
          type="tel"
          name="phoneNumber"
          defaultValue={ user.phoneNumber ? user.phoneNumber : '' }
          ref={register({ required: false })}
        />

        {errors.phoneNumber && <div>Please enter a valid phone number</div>}

        <input 
          className="update-input update-password-input"
          type="password"
          name="password"
          ref={register({ required: true, validate: isCorrectPassword })}
        />

        {errors.password && errors.password.type === 'validate' && (
          <div>Incorrect password</div>
        )}
        
        {errors.password && <div>Please enter your password</div>}

        <input 
          className="update-input"
          id="update-street-input"
          type="text"
          name="street"
          defaultValue={ user.shippingAddress ? user.shippingAddress.street : '' }
          placeholder="Street"
          ref={register({ required: false })}
        />
        
        <input 
          className="update-input"
          id="update-city-input"
          type="text"
          name="city"
          defaultValue={ user.shippingAddress ? user.shippingAddress.city : '' }
          placeholder="City"
          ref={register({ required: false })}
        />

        <input 
          className="update-input"
          id="update-zipCode-input"
          type="text"
          name="zipCode"
          defaultValue={ user.shippingAddress ? user.shippingAddress.zipCode : '' }
          placeholder="zipCode"
          ref={register({ required: false })}
        />

        <input 
          className="update-input"
          id="update-state-input"
          type="text"
          name="state"
          defaultValue={ user.shippingAddress ? user.shippingAddress.state : '' }
          placeholder="State"
          ref={register({ required: false })}
        />

        <input 
          className="update-input"
          id="update-country-input"
          type="text"
          name="country"
          defaultValue={ user.shippingAddress ? user.shippingAddress.country : '' }
          placeholder="Country"
          ref={register({ required: false })}
        />

        <button id="submit-update-btn">Update Account</button>
      </form>
    </div>
  )
}

export default UpdateUser;
