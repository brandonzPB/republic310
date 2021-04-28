import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as actions from '../../../modules/actions';
import './loginTabForm.css';

interface UserForm {
  email: string;
  password: string;
}

interface LoginStateProps {
  loading: boolean;
  hidden: boolean;
  error: boolean;
};

interface LoginFormProps {
  closeLoginForm: () => void;
  setLoading: () => void;
  stopLoading: () => void;
  loginForm: LoginStateProps;
  toggleError: (flag: boolean) => void;
};

const LoginTabForm: React.FC<LoginFormProps> = ({
  closeLoginForm, 
  setLoading, 
  stopLoading, 
  loginForm, 
  toggleError, 
}: LoginFormProps) => {

  const { user, login } = useContext(GlobalContext);

  const { changeDest } = useContext(RouteContext);

  // LOGIN FORM
  const { register, handleSubmit, errors } = useForm<UserForm>();

  // HANDLE LOGIN (helper; checks if password is correct)
  const handleLogin = async (data: UserForm): Promise<any> => {
    const loginResult: any = await login(data);

    return loginResult === 'Success';
  }

  // SUBMIT LOGIN FORM
  const onSubmit = async (data: UserForm): Promise<any> => {
    console.log(data);
    // email is available; attempt login

    toggleError(false);
    setLoading();

    // attempt login
    const loginResult: any = await handleLogin(data);

    stopLoading();

    if (!loginResult) {
      console.log('login error');
      
      // most likely the password is incorrect
      return toggleError(true);
    }

    closeLoginForm();
  }

  // CHECK IF EMAIL IS AVAILABLE
  const emailIsValid = async (email: string): Promise<any> => {
    const emailIsAvailable: any = await actions.emailIsAvailable(email);

    // email is unavailable
    if (emailIsAvailable) return false;

    return true;
  }

  // HANDLE RESET REQUEST (forgot password button)
  const handleResetRequest = (): void => {
    closeLoginForm();
    changeDest('/reset/request');
  }

  return (
    <div id="login-form__container">
      <span id="no-account-text">Don't have account? No worries, you can easily create one at checkout!</span>

      <button id="close-login-btn" onClick={closeLoginForm}>Hide Tab</button>

      <form onSubmit={handleSubmit(onSubmit)} id="login-form">
        <div id="login-input__container">
          <input 
            style={{ backgroundColor: errors.email ? 'pink' : 'white' }}
            className="login-input"
            id="email-login-input"
            placeholder="Email"
            type="text"
            name="email"
            ref={register({ required: true, validate: emailIsValid })}
          />

          {errors.email && <div style={{ color: 'red', margin: '0.5rem auto' }}>Email not found</div>}

          <input 
            style={{ backgroundColor: loginForm.error ? 'pink' : 'white' }}
            className="login-input"
            id="password-login-input"
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
          />

          {
            loginForm.error === true
              ? <div style={{ color: 'red', margin: '0.5rem auto' }}>Incorrect password</div>
              : <></>
          }
        </div>

        <button id="login-btn">Login</button>
      </form>

      <span id="forgot-password-btn" onClick={handleResetRequest}>Forgot password?</span>
    </div>
  )
}

export default LoginTabForm;