import React from 'react';
import './header.css';
const heroSrc = require('../../assets/images/hero_1.jpg');

const Header = () => {
  return (
    <div id="header_container">
      <div id="hero-img__container">
        <img id="hero-img" src={heroSrc} alt="Photograph of two female surfers walking on the beach" />
      </div>
    </div>
  )
}

export default Header;
