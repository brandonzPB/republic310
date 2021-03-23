import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import './navBar.css';
import logoSrc from '../../assets/images/logo.jpg';

const NavBar: React.FC  = () => {
  return (
    <div id="nav__container">
      <h1 id ="nav-link-text">SHOP</h1>
      <h1 id ="nav-link-text">ABOUT US</h1>
      <img id="logo" src={logoSrc} alt="Logo of The Republic 310" />
      <h1 id ="nav-link-text">CONTACT US</h1>
      <h1 id ="nav-link-text">LOGIN</h1>
    </div>
  )
}

export default NavBar;
