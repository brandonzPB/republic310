import React, { useContext } from 'react';
import { GrInstagram } from 'react-icons/gr';
import { AiOutlineFacebook } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';

import { RouteContext } from '../../contexts/RouteContext';

import ContactForm from './ContactForm';

import './footer.css';

const Footer: React.FC = () => {
  const { changeDest } = useContext(RouteContext);

  const siteLinks = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Shop',
      path: '/products',
    },
    {
      title: 'About Us',
      path: '/about',
    },
  ];

  const handleNav = (path: string): void => {
    changeDest(path);
  }

  const SiteLinksComponents = siteLinks.map((page: any) => {
    return (
      <li
        className="site-link" 
        onClick={() => handleNav(page.path)}
      >
        {page.title}
      </li>
    )
  });

  return (
    <div id="footer__container">
      <div id="top-footer__container">
        <div id="contact-footer__container">
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
            <a
              href="https://facebook.com"
              id="facebook-link"
            >
             <AiOutlineFacebook 
               className="social-icon"
               id="facebook"
             />
            </a>
            <a
              href="https://twitter.com/codesInStoic"
              id="twitter-link"
            >
              <FiTwitter 
                className="social-icon"
                id="twitter"
              />
            </a>
          </div>

          <div id="email__container">
            <span id="contact-footer-header">Contact Us</span>

            <a
              href="mailto:contact@republic310.com"
              id="email"
            >
              <span id="email-text">
                contact@republic310.com
              </span>
            </a>
          </div>
        </div>

        <div id="site-links__container">
          <span id="site-links-header">Site Navigation</span>

          <ul id="site-links">
            {SiteLinksComponents}
          </ul>
        </div>
      </div>

      <div id="bottom-footer__container">
        <span id="copyright">© The Republic 310, 2021. All rights reserved.</span>
      </div>
    </div>
  )
}

export default Footer;
