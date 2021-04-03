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
  const [loginForm, setLoginForm] = useState(false);

  // EMAIL INPUT STATE (used to check if email exists in database)
  const [loginInput, setLoginInput] = useState({ email: '' });

  // LOGIN FORM
  const { register, handleSubmit, errors } = useForm<UserForm>();

  const showLoginFromText = (): void => {
    if (loginForm) return;

    setLoginForm(!loginForm);
  }

  const showLoginFromButton = (): void => {
    if (!loginForm) return;

    setLoginForm(!loginForm);
  }

  const onSubmit = async (data: UserForm): Promise<void> => {}

  const isAvailable = async (email: string): Promise<any> => {
    const emailIsAvailable: any = actions.emailIsAvailable(email);

    if (emailIsAvailable) {
      setLoginInput({ ...loginInput, email });
    }

    return emailIsAvailable;
  }

  const correctPassword = async (password: string): Promise<any> => {
    const credentials: object = {
      email: loginInput.email,
      password
    };

    const loginResult: any = await login(credentials);

    return loginResult === 'Success';
  }

  const handleNav = (path: string): void => {
    if (path === 'cart' && cart.products.length === 0) return;

    changeDest(path);
  }

  // DON'T HAVE AN ACCOUNT? YOU CAN EASILY CREATE ONE AT CHECKOUT

  return (
    <div id="nav__container">
      <h1 id ="nav-link-text" onClick={() => handleNav('products')}>SHOP</h1>

      <h1 id ="nav-link-text" onClick={() => handleNav('about')}>ABOUT US</h1>

      <img id="logo" src={logoSrc} onClick={() => handleNav('home')} alt="Logo of The Republic 310" style={{ cursor: 'pointer' }} />

      <h1 id ="nav-link-text" onClick={() => handleNav('contact')}>CONTACT US</h1>

      <div id="login__container" style={{ backgroundColor: 'transparent' }}>
        <h1 id ="nav-link-text" onClick={showLoginFromText}>LOGIN</h1>

        <div id="login-form__container" style={{ display: loginForm ? 'block' : 'none' }}>
          <span id="close-login-btn" onClick={showLoginFromButton}>Close</span>
          
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
              ref={register({ required: true, validate: correctPassword })}
            />
          </form>
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
