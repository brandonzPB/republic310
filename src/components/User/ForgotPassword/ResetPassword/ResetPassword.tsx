import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { RouteContext } from '../../../../contexts/RouteContext';
import * as actions from '../../../../modules/actions';
import './resetPassword.css';

interface PasswordForm {
  newPassword: string;
  confirmNewPassword: string;
};

const ResetPassword: React.FC = () => {
  const { resetPassword, user, resetToken } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const [error, setError] = useState(false);

  const { register, errors, handleSubmit } = useForm<PasswordForm>();

  // HANDLE SUBMIT
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);

    setError(false);

    if (data.newPassword !== data.confirmNewPassword) {
      return setError(true);
    }

    const resetCode: string = user.resetCode;

    resetPassword(data.newPassword, resetCode, resetToken);
    changeDest('/');
  }

  return (
    <>
      {
        dest === '/reset/password'
          ? <div id="reset-password__container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input 
                className="reset-input-password"
                name="newPassword"
                type="password"
                ref={register({ required: true })}
              />
              {errors.newPassword && <div>Please enter a password</div>}
      
              <input 
                className="reset-input-password"
                name="confirmNewPassword"
                type="password"
                ref={register({ required: true })}
              />
              {error && <div>Passwords don't match</div>}
      
              <button id="reset-password-btn">Set New Password</button>
            </form>
          </div>
          : !dest
            ? <Route exact path="/reset/password">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/reset/password">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default ResetPassword;