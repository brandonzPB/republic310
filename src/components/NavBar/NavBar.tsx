import React, { useState, useEffect, useContext } from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';

import { IconContext } from 'react-icons';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';

import UserInfoTab from '../User/InfoTab/UserInfoTab';
import LoginTabForm from '../User/LoginTab/LoginTabForm';
import MobileModal from '../MobileModal/MobileModal';
import logoSrc from '../../assets/images/logo.jpg';

import './navBar.css';

const NavBar: React.FC  = () => {
  // GLOBAL CONTEXT
  const { cart, user } = useContext(GlobalContext);

  // ROUTE CONTEXT
  const { changeDest } = useContext(RouteContext);

  // LOGIN FORM STATE (display purposes)
  const [loginForm, setLoginForm] = useState({
    loading: false, 
    hidden: true, 
    error: false,
  });

  // MOBILE MENU STATE
  const [mobileMenu, setMobileMenu] = useState({ display: false });

  // ACCOUNT OPTIONS STATE (display purposes)
  const [options, setOptions] = useState({ display: false });

  useEffect(() => {
    console.log('loginForm', loginForm);
  }, [loginForm]);

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

  // TOGGLE ERROR
  const toggleError = (flag: boolean): void => {
    setLoginForm({ ...loginForm, error: flag });
  }

  // SHOW MOBILE MENU
  const showMobileMenu = (): void => {
    setMobileMenu({ ...mobileMenu, display: true });
  }

  // HIDE MOBILE MENU
  const hideMobileMenu = (): void => {
    setMobileMenu({ ...mobileMenu, display: false });
  }

  return (
    <div id="nav__container">
      <div id="nav-web__container">
        <div id="nav-left__container">
          <h1 className="nav-link-text" onClick={() => handleNav('/products')}>SHOP</h1>

          <h1 className="nav-link-text" onClick={() => handleNav('/about')}>ABOUT US</h1>
        </div>

        <img 
          id="logo" 
          src={logoSrc} 
          onClick={() => handleNav('/')} 
          alt="Logo of The Republic 310" 
          style={{ cursor: 'pointer' }} 
        />

        <div id="nav-right__container">
          <h1 className="nav-link-text" onClick={() => handleNav('/contact')}>CONTACT US</h1>

          <div 
            id="logout__container" 
            onMouseOver={showAccountOptions}
            style={{ display: user.isAuthorized ? 'block' : 'none', backgroundColor: 'transparent' }}
          >
            <h1 className="nav-link-text">ACCOUNT</h1>

            <div 
              id="account-options__container" 
              onMouseOut={hideAccountOptions}
              style={{ display: options.display ? 'block' : 'none' }} 
            >
              <UserInfoTab />
            </div>
          </div>

          <div id="login__container" style={{ display: user.isAuthorized ? 'none' : 'block', backgroundColor: 'transparent' }}>
            <h1 className="nav-link-text" onClick={showLoginForm}>LOGIN</h1>

            <div id="login-tab__container" style={{ display: !loginForm.hidden ? 'block' : 'none' }}>
              {
                loginForm.loading
                  ? <div id="loading-login__container">Logging in...</div>
                  : <LoginTabForm 
                    closeLoginForm={closeLoginForm} 
                    setLoading={setLoading} 
                    stopLoading={stopLoading}
                    loginForm={loginForm}
                    toggleError={toggleError}
                  />
              }
            </div>
          </div>

          <IconContext.Provider 
            value={{ style: {
              fontSize: '2.5rem', 
              backgroundColor: '#ef3b24', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}}
          >
            <div id="nav-cart__container" onClick={() => handleNav('/cart')}>              
              <RiShoppingCart2Line id="nav-cart-icon" />

              <span id="cart-qty">{cart.totalItemCount}</span>
            </div>
          </IconContext.Provider>
        </div>
      </div>

      <div id="nav-mobile__container">
        <IconContext.Provider value={{ style: { fontSize: '2.5rem', backgroundColor: '#ef3b24' }}}>
          <div id="nav-hamburger__container">
            <GiHamburgerMenu onClick={() => showMobileMenu} id="nav-hamburger-icon" />
          </div>
        </IconContext.Provider>

        <img 
          id="logo" 
          src={logoSrc} 
          onClick={() => handleNav('/')} 
          alt="Logo of The Republic 310" 
          style={{ cursor: 'pointer' }} 
        />

        <IconContext.Provider 
          value={{ style: {
            fontSize: '2.5rem', 
            backgroundColor: '#ef3b24', 
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}}
        >
          <div id="nav-cart__container" onClick={() => handleNav('/cart')}>              
            <RiShoppingCart2Line id="nav-cart-icon" />

            <span id="cart-qty">{cart.totalItemCount}</span>
          </div>
        </IconContext.Provider>
      </div>

      <div id="modal__container" style={{ display: mobileMenu.display ? 'block' : 'none' }}>
        <MobileModal />
      </div>
    </div>
  )
}

export default NavBar;
