import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../contexts/GlobalContext';
import { RouteContext } from '../../contexts/RouteContext';
import './navBar.css';
import logoSrc from '../../assets/images/logo.jpg';

interface UserForm {
  email: string;
  password: string;
}

const NavBar: React.FC  = () => {
  const { dest, changeDest } = useContext(RouteContext);

  const [loginForm, setLoginForm] = useState(false);

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

  const isActive = (email: string): any => {}

  const correctPassword = (password: string): any => {}

  return (
    <div id="nav__container">
      <h1 id ="nav-link-text">SHOP</h1>

      <h1 id ="nav-link-text">ABOUT US</h1>

      <img id="logo" src={logoSrc} alt="Logo of The Republic 310" />

      <h1 id ="nav-link-text">CONTACT US</h1>

      <div id="login__container">
        <h1 id ="nav-link-text" onClick={showLoginFromText}>LOGIN</h1>

        <div id="login-form__container" style={{ display: loginForm ? 'block' : 'none' }}>
          <span id="close-login-btn" onClick={showLoginFromButton}>Close</span>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input 
              style={{ backgroundColor: errors.email ? 'pink' : 'white' }}
              className="login-input"
              id="email-login-input"
              placeholder="Email"
              type="text"
              name="email"
              ref={register({ required: true, validate: isActive })}
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
    </div>
  )
}

export default NavBar;
