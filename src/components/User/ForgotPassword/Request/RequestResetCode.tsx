import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
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

  const { register, errors, handleSubmit } = useForm<EmailInput>();

  const [loading, setLoading] = useState(false);

  if (dest === 'resetCode') {
    return (
      <Route exact path="/reset/request">
        <Redirect to="/reset/code" />
      </Route>
    )
  }

  if (dest === 'index' || dest !== 'resetRequest') {
    return (
      <Route exact path="/reset/request">
        <Redirect to="/" />
      </Route>
    )
  }

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
    changeDest('resetCode');
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
    <div id="request-reset-code__container">
      <div id="loading__container" style={{ display: loading ? 'block' : 'none' }}>
        <span id="sending-code-text">Sending code...</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          id="reset-input-email"
          type="email"
          name="email"
          ref={register({ required: true, validate: isValid })}
        />
        {errors.email && <div>Email does not exist in database</div>}

        <button id="submit-reset-email-btn">Send reset code</button>
      </form>
    </div>
  )
}

export default RequestResetCode;