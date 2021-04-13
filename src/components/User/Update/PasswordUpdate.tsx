import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as actions from '../../../modules/actions';
import './passwordUpdate.css';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const PasswordUpdate = () => {
  const { user, updateUserPassword } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const { register, errors, handleSubmit } = useForm<PasswordForm>();

  // SUBMIT UPDATE FORM
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);
    setError(false);

    if (data.newPassword !== data.confirmNewPassword) {
      setError(true);
      return false;
    }
    
    updateUserPassword(data.password);
    setLoading(true);

    setTimeout(() => { changeDest('/') }, 1000);
  }

  // CHECKS IF PASSWORD IS CORRECT
  const isCorrectPassword = async (currentPassword: string): Promise<any> => {
    const userId: string = user._id!;
    const token: string = user.accessToken!;

    return await actions.comparePasswords(currentPassword, userId, token);
  }

  return (
    <>
      {
        dest === '/user/update/password'
          ? <>
            {
              loading
                ? <div id="update-password-loading">
                  <span id="update-password-loading-text">Success! Returning to index...</span>
                </div>
                : <form onSubmit={handleSubmit(onSubmit)}>
                  <input 
                    className="update-input"
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    ref={register({ required: true, validate: isCorrectPassword })}
                  />
                  {errors.currentPassword && <div>Please enter your current password</div>}
            
                  <input 
                    className="update-input"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    ref={register({ required: true })}
                  />
            
                  {errors.newPassword && <div>Please enter a new password</div>}
            
                  <input 
                    className="update-input"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    ref={register({ required: true })}
                  />
            
                  {error && <div>Passwords don't match</div>}
            
                  <button id="update-password-btn">Update Password</button>
                </form>
            }
          </>
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