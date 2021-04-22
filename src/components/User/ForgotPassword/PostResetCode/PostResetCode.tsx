import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { RouteContext } from '../../../../contexts/RouteContext';
import './postResetCode.css';

interface CodeForm {
  code: string;
};

const PostResetCode: React.FC = () => {
  const { user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const content: string = 'We\'ll help you out with your account details | The Republic 310';

  const { register, errors, handleSubmit } = useForm<CodeForm>();

  // HANDLE SUBMIT
  const onSubmit = (data: any): void => {
    console.log('data', data);

    changeDest('/reset/password');
  }

  // CHECKS IF CODE MATCHES RESET TOKEN
  const matchesToken = (code: string): any => {
    return code === user.resetCode;
  }

  return (
    <>
      <Helmet>
        <title>Update Your Account | The Republic 310</title>
        <meta name="description" content={content} />
      </Helmet>

      {
        dest === '/reset/code'
          ? <div id="post-reset-code__container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input 
                id="reset-input-code"
                type="text"
                name="code"
                placeholder="Reset Code"
                ref={register({ required: true, validate: matchesToken })}
              />
              {errors.code && <div>Code is incorrect. Please try again</div>}
      
              {errors.code && (
                <button id="return-to-request-btn" onClick={() => changeDest('/reset/request')}>Click here to resend code</button>
              )}
      
              <button id="submit-code-btn">Submit Code</button>
            </form>
          </div>
          : !dest
            ? <Route exact path="/reset/code">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/reset/code">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default PostResetCode;