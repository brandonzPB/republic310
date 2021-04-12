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

interface LoginFormProps {
  closeLoginForm: () => void;
  setLoading: () => void;
  stopLoading: () => void;
};

const LoginTabForm: React.FC<LoginFormProps> = ({ closeLoginForm, setLoading, stopLoading }: LoginFormProps) => {
  const { login } = useContext(GlobalContext);

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

    setLoading();

    // attempt login
    const loginResult: any = await handleLogin(data);

    stopLoading();

    if (!loginResult) {
      console.log('login error');
      return;
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
    changeDest('resetRequest');
  }

  return (
    <div id="login-form__container">
      <span id="no-account-text">Don't have account? No problem, you can easily create one at checkout!</span>

      <span id="close-login-btn" onClick={closeLoginForm}>Close Login</span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          style={{ backgroundColor: errors.email ? 'pink' : 'white' }}
          className="login-input"
          id="email-login-input"
          placeholder="Email"
          type="text"
          name="email"
          ref={register({ required: true, validate: emailIsValid })}
        />

        {errors.email && <div>Email not found</div>}

        <input 
          style={{ backgroundColor: errors.password ? 'pink' : 'white' }}
          className="login-input"
          id="password-login-input"
          type="password"
          name="password"
          ref={register({ required: true })}
        />

        {errors.password && <div>Incorrect password</div>}

        <button id="login-btn">Login</button>

        <button id="forgot-password-btn" onClick={handleResetRequest}>Forgot password</button>
      </form>
    </div>
  )
}

export default LoginTabForm;