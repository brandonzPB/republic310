import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { RouteContext } from '../../../../contexts/RouteContext';
import * as actions from '../../../../modules/actions';
import './requestResetCode.css';

interface EmailInput {
  email: string;
};

const RequestResetCode: React.FC = () => {
  const { user, requestReset } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const content: string = 'We\'ll help you out with your account details | The Republic 310';

  const { register, errors, handleSubmit } = useForm<EmailInput>();

  const [loading, setLoading] = useState(false);

  // HANDLE SUBMIT
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);
    setLoading(true);

    const emailResult: any = await requestReset(data.email);

    if (emailResult === 'Error') {
      setLoading(false);
      return false;
    }

    setLoading(false);
    changeDest('/reset/code');
  }

  // CHECKS IF EMAIL IS VALID
  const isValid = async (email: string): Promise<any> => {
    // returns true if email is available (not being used)
    // returns false if email is not available (being used)
    const emailIsValid: boolean = await actions.emailIsAvailable(email);

    if (emailIsValid === true) {
      // email is not being used
      return false;
    }

    // email is being used (code will be sent)
    return true;
  }

  return (
    <>
      <Helmet>
        <title>Update Your Account | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/reset/request'
          ? <div id="request-reset-code__container">
            <div id="loading__container" style={{ display: loading ? 'block' : 'none' }}>
              <span id="sending-code-text">Sending code...</span>
            </div>
      
            <form onSubmit={handleSubmit(onSubmit)}>
              <input 
                id="reset-email-input"
                type="email"
                name="email"
                placeholder="Email"
                ref={register({ required: true, validate: isValid })}
              />
              {errors.email && <div>Email does not exist in database</div>}
      
              <button id="submit-reset-email-btn">Send reset code</button>
            </form>
          </div>
          : !dest
            ? <Route exact path="/reset/request">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/reset/request">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default RequestResetCode;