import React from 'react';
import { GrInstagram } from 'react-icons/gr';

import './footer.css';

const Footer: React.FC = () => {
  return (
    <div id="footer__container">
      <div id="top-footer__container">
        <div id="contact-footer__container">
          <span id="contact-footer-header">Contact Us</span>
          <a
            href="mailto:contact@republic310.com"
            id="email"
          >
            contact@republic310.com
          </a>
        </div>

        <div id="socials-footer__container">
          <span id="socials-footer-header">Stay Connected</span>
          
          <div id="socials__container">
            <GrInstagram 
              className="social-icon"
              id="insta" 
            />
          </div>
        </div>
      </div>

      <div id="bottom-footer__container">
        <span id="copyright">© The Republic 310, 2021. All rights reserved.</span>
      </div>
    </div>
  )
}

export default Footer;
