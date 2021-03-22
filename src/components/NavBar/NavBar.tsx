import React from 'react';
import { GlobalStateContext, GlobalDispatchContext } from '../../contexts/GlobalContext';
import './navBar.css';
const logoSrc = require('../assets/images/logo.jpg');

const NavBar = () => {
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
