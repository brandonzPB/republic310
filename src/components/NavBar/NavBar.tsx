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
  const { login, cart } = useContext(GlobalContext);

  // ROUTE CONTEXT
  const { dest, changeDest } = useContext(RouteContext);

  // LOGIN FORM STATE (display purposes)
  const [loginForm, setLoginForm] = useState({ loading: false, hidden: false });

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

    if (!loginResult || loginResult.result !== 'Success') {
      return false;
    }

    return true;
  }

  // SUBMIT LOGIN FORM
  const onSubmit = async (data: UserForm): Promise<any> => {
    console.log(data);
    // email is available; attempt login

    setLoginForm({ ...loginForm, loading: true });

    // login attempt
    const loginResult: any = await handleLogin(data);

    if (!loginResult) {
      console.log('login error');
      return;
    }

    setLoginForm({ ...loginForm, loading: false });
    closeLoginForm();
  }

  // CHECK IF EMAIL IS AVAILABLE
  const isAvailable = async (email: string): Promise<any> => {
    const emailIsAvailable: any = actions.emailIsAvailable(email);

    if (!emailIsAvailable || emailIsAvailable !== 'Success') return false;

    return true;
  }

  // HANDLE NAVBAR NAVIGATION
  const handleNav = (path: string): void => {
    if (path === 'cart' && cart.products.length === 0) return;

    changeDest(path);
  }

  return (
    <div id="nav__container">
      <h1 id ="nav-link-text" onClick={() => handleNav('products')}>SHOP</h1>

      <h1 id ="nav-link-text" onClick={() => handleNav('about')}>ABOUT US</h1>

      <img id="logo" src={logoSrc} onClick={() => handleNav('home')} alt="Logo of The Republic 310" style={{ cursor: 'pointer' }} />

      <h1 id ="nav-link-text" onClick={() => handleNav('contact')}>CONTACT US</h1>

      <div id="login__container" style={{ backgroundColor: 'transparent' }}>
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
                    ref={register({ required: true, validate: isAvailable })}
                  />

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
