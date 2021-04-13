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

  // SUBMIT UPDATE FORM
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);
  }

  // CHECKS IF PASSWORD IS CORRECT
  const isCorrectPassword = (password: string): any => {
    return password === user.password;
  }

  return (
    <>
      {
        dest === '/user/update/password'
          ? <form onSubmit={handleSubmit(onSubmit)}>
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
          : !dest
            ? <Route exact path="/user/update/password">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/user/update/password">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default PasswordUpdate;