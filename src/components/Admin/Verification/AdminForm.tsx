import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as actions from '../../../modules/actions';
import './adminForm.css'

interface AdminFormProps {
  email: string;
  password: string;
};

const AdminForm: React.FC = () => {
  const { user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const { register, errors, handleSubmit } = useForm<AdminFormProps>();

  // CHECK IF CREDENTIALS ARE CORRECT
  const handleVerification = async (data: any): Promise<any> => {
    const token: string = user.accessToken;
    const userId: string = user._id;

    const credentials = {
      ...data,
      userId,
    };

    const result: string = await actions.verifyAdmin(credentials, token);

    return result === 'Success';
  }

  // ON SUBMIT
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);

    const verificationResult: any = await handleVerification(data);

    if (!verificationResult) {
      console.log('User not authorized');
      return;
    }

    changeDest('/stats/verified');
  }

  return (
    <>
      {
        dest === '/stats'
          ? <>
            {
              user.isAdmin
                ? <form onSubmit={handleSubmit(onSubmit)}>
                  <input 
                    className="admin-input"
                    type="text"
                    name="email"
                    placeholder="Email"
                    ref={register({ required: true })}
                  />
      
                  <input 
                    className="admin-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={register({ required: true })}
                  />
      
                  <button id="submit-admin-form-btn">Verify Credentials</button>
                </form>
                : <Route exact path="/stats">
                  <Redirect to="/" />
                </Route>
            }
          </>
          : !dest
            ? <Route exact path="/stats">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/stats">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default AdminForm;
