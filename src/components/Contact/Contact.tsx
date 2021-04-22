import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RouteContext } from '../../contexts/RouteContext';

const Contact: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  const content: string = 'Please feel free to contact the Republic 310 team with any questions, concerns, or feedback';

  return (
    <>
      <Helmet>
        <title>Contact Us | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/contact'
          ? <div id="contact__container"></div>
          : !dest
            ? <Route exact path="/contact">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/contact">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default Contact;
