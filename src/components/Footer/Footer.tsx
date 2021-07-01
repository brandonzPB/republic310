import React from 'react';
import { GrInstagram } from 'react-icons/gr';

import ContactForm from './ContactForm';

import './footer.css';

const Footer: React.FC = () => {
  return (
    <div id="footer__container">
      <div id="top-footer__container">
        <div id="contact-footer__container">
          <span id="contact-footer-header">Contact Us</span>
          <ContactForm />
        </div>

        <div id="socials-footer__container">
          <span id="socials-footer-header">Stay Connected</span>
          
          <div id="socials__container">
            <a
              href="https://www.instagram.com/republic.310/"
              id="insta-link"
            >
              <GrInstagram 
                className="social-icon"
                id="insta" 
              />
            </a>
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
