import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import './navBar.css';
import logoSrc from '../../assets/images/logo.jpg';
import * as actions from '../../modules/actions';

interface UserForm {
  email: string;
  password: string;
}

const NavBar: React.FC  = () => {
  // GLOBAL CONTEXT
  const { login, cart, user } = useContext(GlobalContext);

  // ROUTE CONTEXT
  const { dest, changeDest } = useContext(RouteContext);

  // LOGIN FORM STATE (display purposes)
  const [loginForm, setLoginForm] = useState({ loading: false, hidden: true });

  // LOGIN FORM
  const { register, handleSubmit, errors } = useForm<UserForm>();

  // SHOW LOGIN FORM (triggered by clicking 'Login')
  const showLoginForm = (): void => {
    if (!loginForm.hidden) return;

    setLoginForm({ ...loginForm, hidden: false });
  }

  // CLOSE LOGIN FORM (triggered by clicking 'Close' button)
  const closeLoginForm = (): void => {
    if (loginForm.hidden) return;

    setLoginForm({ ...loginForm, hidden: true });
  }

  // HANDLE LOGIN (helper; checks if password is correct)
  const handleLogin = async (data: UserForm): Promise<any> => {
    const loginResult: any = await login(data);

    return loginResult === 'Success';
  }

  // SUBMIT LOGIN FORM
  const onSubmit = async (data: UserForm): Promise<any> => {
    console.log(data);
    // email is available; attempt login

    setLoginForm({ ...loginForm, loading: true });

    // attempt login
    const loginResult: any = await handleLogin(data);

    setLoginForm({ ...loginForm, loading: false });

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

  // HANDLE NAVBAR NAVIGATION
  const handleNav = (path: string): void => {
    if (path === 'cart' && cart.products.length === 0) return;

    changeDest(path);
  }

  // HANDLE RESET REQUEST (forgot password button)
  const handleResetRequest = (): void => {
    closeLoginForm();
    changeDest('resetRequest');
  }

  return (
    <div id="nav__container">
      <h1 id ="nav-link-text" onClick={() => handleNav('products')}>SHOP</h1>

      <h1 id ="nav-link-text" onClick={() => handleNav('about')}>ABOUT US</h1>

      <img id="logo" src={logoSrc} onClick={() => handleNav('index')} alt="Logo of The Republic 310" style={{ cursor: 'pointer' }} />

      <h1 id ="nav-link-text" onClick={() => handleNav('contact')}>CONTACT US</h1>

      <div id="logout__container" style={{ display: user.isAuthorized ? 'block' : 'none' }}>
        <span id="user-info-link" onClick={() => changeDest('userInfo')}>Your Account</span>
      </div>

      <div id="login__container" style={{ display: user.isAuthorized ? 'none' : 'block', backgroundColor: 'transparent' }}>
        <h1 id ="nav-link-text" onClick={showLoginForm}>LOGIN</h1>

        <div id="login-form__container" style={{ display: !loginForm.hidden ? 'block' : 'none' }}>
          {
            loginForm.loading
              ? <div id="loading-login__container">Logging in...</div>
              : <div id="login-form-child__container">
                <span id="close-login-btn" onClick={closeLoginForm}>Close</span>

                <span id="no-account-text">Don't have account? No problem, you can easily create one at checkout!</span>

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
          }
        </div>
      </div>

      <IconContext.Provider value={{ style: { fontSize: '2.5rem', backgroundColor: '#ef3b24', cursor: 'pointer' }}}>
        <div id="nav-cart__container">
          <div id="cart-qty__container">
            <span id="cart-qty">{cart.totalItemCount}</span>
          </div>
          <RiShoppingCart2Line onClick={() => handleNav('cart')} />
        </div>
      </IconContext.Provider>
    </div>
  )
}

export default NavBar;
