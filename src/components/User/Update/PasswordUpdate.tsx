import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './passwordUpdate.css';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const PasswordUpdate = () => {
  const { user, updateUserPassword } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const { register, errors, handleSubmit } = useForm<PasswordForm>();

  if (dest === 'cart') {
    return (
      <Route exact path="/user/update/password">
        <Redirect to="/cart" />
      </Route>
    )
  }

  if (dest === 'contact') {
    return (
      <Route exact path="/user/update/password">
        <Redirect to="/contact" />
      </Route>
    )
  }

  if (dest === 'products') {
    return (
      <Route exact path="/user/update/password">
        <Redirect to="/products" />
      </Route>
    )
  }

  if (dest === 'about') {
    return (
      <Route exact path="/user/update/password">
        <Redirect to="/about" />
      </Route>
    )
  }

  if (dest === 'home' || dest !== 'updatePassword') {
    return (
      <Route exact path="/user/update/password">
        <Redirect to="/" />
      </Route>
    )
  }

  // SUBMIT UPDATE FORM
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);
    console.log('register', register);
  }

  // CHECKS IF PASSWORD IS CORRECT
  const isCorrectPassword = (password: string): any => {
    return password === user.password;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        className="update-input"
        type="password"
        name="currentPassword"
        ref={register({ required: true, validate: isCorrectPassword })}
      />
      {errors.currentPassword && <div>Please enter your current password</div>}

      <input 
        className="update-input"
        type="password"
        name="newPassword"
        ref={register({ required: true })}
      />

      {errors.newPassword && <div>Please enter a new password</div>}

      <input 
        className="update-input"
        type="password"
        name="confirmNewPassword"
        ref={register({ required: true })}
      />

      {errors.confirmNewPassword && errors.confirmNewPassword.type === 'validate' && (
        <div>Passwords don't match</div>
      )}

      <button id="update-password-btn">Update Password</button>
    </form>
  )
}

export default PasswordUpdate;