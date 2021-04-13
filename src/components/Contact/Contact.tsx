import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteContext } from '../../contexts/RouteContext';

const Contact: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  return (
    <>
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
