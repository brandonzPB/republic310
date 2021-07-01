import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

import './about.css';

const About: React.FC = ({ ...props }) => {
  const { dest, } = useContext(RouteContext);

  const content: string = "Our mission at The Republic 310 is to provide the best hemp product for your every need."

  return (
    <>
      <Helmet>
        <title>About Us | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/about'
          ? <div id="about__container">
            <h1 id="about-header">Why <em>The Republic 310?</em></h1>

            <span id="about-content">
              The Republic 310 is a California-based brand established in 2021. 
              Our goal is to produce exceptionally high-quality products that provide our 
              customers with unrivaled health benefits, while capturing the vintage vibe 
              of Califiornia. We keep everything as organic and natural as possible. 
              We keep it simple. <br/><br/>

              We've personally used a variety of brands and never quite felt that those 
              brands were allowing us to achieve the full potential of health benefits 
              that hemp has to offer. That's why we only produce Full-Spectrum CBD and CBG. 
              We don’t use any isolates or broad spectrum-based distillates or crystallized powders. 
              We don't want to compromise the power of the plant by trying to save money or maximize 
              profit. We don't cut corners. Our product speaks for itself both through our COA’s 
              cannabinoids levels, and the measure of essential terpenes also found in the products 
              you receive. <br/><br/>

              Our manufacturing process starts with USDA-certified organic hemp, and we don't use 
              any volatile chemicals at any given point of this procedure. The final product contains 
              organic high-grade MCT oil as a carrier so that the oil flows smoothly to and 
              from the dropper. <br/><br/>

              As long as the amazing hemp farmers of California keep producing high quality hemp, 
              we will keep producing high quality products for you to enjoy. Our favorite part about 
              it all is that it starts at the source, and we here at the 310 work hard to find that source.
              <br/><br/>

              Our product tastes like our product: hemp. We're not trying to fool anyone here. 
              The richness of the color and the power of the hemp is expressed best in its natural state. 
              You literally taste the plant as it is. No additives. No fluff. No ice cream or cotton candy 
              flavoring here. Sugar coating our product would be sugar coating the power of hemp, and that 
              just isn't what we do. Our product is earthly and natural. There is no doubt that you are 
              getting exactly what you paid for with the Republic 310.<br/><br/>

              With love, <br/><br/>
              
              <span id="sign-off">The Republic 310 Team</span>
            </span>

          </div>
          : !dest
          ? <Route exact path="/about">
            <Redirect to="/" />
          </Route>
          : <Route exact path="/about">
            <Redirect to={dest} />
          </Route>
      }
    </>
  )
}

export default About;
