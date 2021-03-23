import React from 'react';
import './header.css';
import heroSrc from '../../../assets/images/hero_1.jpg';

const Header: React.FC = () => {
  return (
    <div id="header_container">
      <div id="hero-img__container">
        <div id="hero-text__container">
          <span id="hero-text">Born and Raised in LA</span>
        </div>
        
        <img id="hero-img" src={heroSrc} alt="Photograph of two female surfers walking on the beach" />
      </div>
    </div>
  )
}

export default Header;
