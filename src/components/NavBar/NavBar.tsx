import React, { useState, useContext } from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import UserInfoTab from '../User/InfoTab/UserInfoTab';
import LoginTabForm from '../User/LoginTab/LoginTabForm';
import './navBar.css';
import logoSrc from '../../assets/images/logo.jpg';

const NavBar: React.FC  = () => {
  // GLOBAL CONTEXT
  const { cart, user } = useContext(GlobalContext);

  // ROUTE CONTEXT
  const { changeDest } = useContext(RouteContext);

  // LOGIN FORM STATE (display purposes)
  const [loginForm, setLoginForm] = useState({ loading: false, hidden: true });

  // ACCOUNT OPTIONS STATE (display purposes)
  const [options, setOptions] = useState({ display: false });

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

  // HANDLE NAVBAR NAVIGATION
  const handleNav = (path: string): void => {
    if (path === 'cart' && cart.products.length === 0) return;

    changeDest(path);
  }

  // SET LOGIN FORM LOADING TO TRUE
  const setLoading = (): void => {
    setLoginForm({ ...loginForm, loading: true });
  }

  // SET LOGIN FORM LOADING TO FALSE
  const stopLoading = (): void => {
    setLoginForm({ ...loginForm, loading: false });
  }

  // SHOW ACCOUNT OPTIONS DISPLAY
  const showAccountOptions = (): void => {
    setOptions({ ...options, display: true });
  }

  // HIDE ACCOUNT OPTIONS DISPLAY
  const hideAccountOptions = (): void => {
    setOptions({ ...options, display: false });
  }

  return (
    <div id="nav__container">
      <h1 className="nav-link-text" onClick={() => handleNav('/products')}>SHOP</h1>

      <h1 className="nav-link-text" onClick={() => handleNav('/about')}>ABOUT US</h1>

      <img id="logo" src={logoSrc} onClick={() => handleNav('/')} alt="Logo of The Republic 310" style={{ cursor: 'pointer' }} />

      <h1 className="nav-link-text" onClick={() => handleNav('/contact')}>CONTACT US</h1>

      <div id="logout__container" style={{ display: user.isAuthorized ? 'block' : 'none' }}>
        <span 
          className="nav-link-text" 
          onMouseOver={showAccountOptions}
          onMouseOut={hideAccountOptions}
        >
          ACCOUNT
        </span>

        <div id="account-options__container" style={{ display: options.display ? 'block' : 'none' }}>
          <UserInfoTab />
        </div>
      </div>

      <div id="login__container" style={{ display: user.isAuthorized ? 'none' : 'block', backgroundColor: 'transparent' }}>
        <h1 className="nav-link-text" onClick={showLoginForm}>LOGIN</h1>

        <div id="login-form__container" style={{ display: !loginForm.hidden ? 'block' : 'none' }}>
          {
            loginForm.loading
              ? <div id="loading-login__container">Logging in...</div>
              : <LoginTabForm 
                closeLoginForm={closeLoginForm} 
                setLoading={setLoading} 
                stopLoading={stopLoading} 
              />
          }
        </div>
      </div>

      <IconContext.Provider value={{ style: { fontSize: '2.5rem', backgroundColor: '#ef3b24', cursor: 'pointer' }}}>
        <div id="nav-cart__container">
          <div id="cart-qty__container">
            <span id="cart-qty">{cart.totalItemCount}</span>
          </div>
          <RiShoppingCart2Line onClick={() => handleNav('/cart')} />
        </div>
      </IconContext.Provider>
    </div>
  )
}

export default NavBar;
