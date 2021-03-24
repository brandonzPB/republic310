import React from 'react';
import './header.css';
import heroSrc from '../../../assets/images/hero_1.jpg';
import './header.css';

const Header: React.FC = () => {
  return (
    <div id="header__container">
      <div id="hero-img__container">        
        <img id="hero-img" src={heroSrc} alt="Photograph of two female surfers walking on the beach" />
      </div>
    </div>
  )
}

export default Header;
