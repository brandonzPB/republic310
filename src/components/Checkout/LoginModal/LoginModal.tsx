import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import './loginModal.css';

interface LoginForm {
  email: string;
  password: string;
};

interface LoginProps {
  hideModal: () => void;
  modalDisplay: {
    show: boolean;
    error: boolean;
  };
};

const LoginModal: React.FC<LoginProps> = ({ hideModal, modalDisplay }: LoginProps) => {
  const { user, login, tempEmail, updateTempEmail } = useContext(GlobalContext);

  const [error, setError] = useState(false);

  const { register, errors, handleSubmit } = useForm<LoginForm>();

  // HANDLE LOGIN (helper)
  const handleLogin = async (data: any): Promise<any> => {
    const credentials: object = { email: data.email, password: data.password };

    const loginResult: string = await login(credentials);

    return loginResult === 'Success';
  }

  // ON SUBMIT
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);
    setError(false);

    if (user.isAuthorized) {
      if (data.email === user.email && data.password === user.password) {

        // user already logged in and rightly so:
        // proceed to payment completion without further ado
        console.log('Credentials are correct');
        return hideModal();

      } else {
        console.log('Incorrect email/password');
        return setError(true);
      }
    }

    const loginResult: boolean = await handleLogin(data);

    if (loginResult === false) {
      console.log('Login error');
      setError(true);
      return false;
    }

    updateTempEmail('');

    return hideModal();
  }

  // CHECK IF EMAIL MATCHES tempEmail (prevents purchase from being made by different user)
  const emailMatchesTemp = (email: string): any => {
    return user.isAuthorized || email === tempEmail;
  }

  return (
    <div id="login-modal__container">
      <span id="login-modal-header" style={{
        fontSize: modalDisplay.error ? '2rem' : '1.75rem',
        color: modalDisplay.error ? 'red' : 'black',
        transition: 'fontSize 1s ease',
        transform: modalDisplay.error ? 'scale(1.1)' : 'none'
      }}>Please log in to place your order</span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="login-modal-input"
          name="email"
          type="text"
          placeholder="Email"
          ref={register({ required: true, validate: emailMatchesTemp })}
        />

        <input 
          className="login-modal-input"
          name="password"
          type="password"
          placeholder="Password"
          ref={register({ required: true })}
        />

        {error && <div>Incorrect password</div>}

        <button id="login-modal-btn">Log in</button>
      </form>
    </div>
  )
}

export default LoginModal;
