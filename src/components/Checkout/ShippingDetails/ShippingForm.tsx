import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import * as actions from '../../../modules/actions';

import './shippingForm.css';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  street: string;
  city: string;
  zipCode: number;
  // country: string;
  state: string;
};

const ShippingForm: React.FC = () => {
  const { user, updateTempEmail } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const { register, handleSubmit, errors } = useForm<UserData>();

  // HANDLE CREATE USER (helper)
  const handleCreateUser = async (data: UserData): Promise<any> => {
    const userObject = { ... data, country: 'United States' };

    const createResult: any = await actions.createUser(userObject);

    if (createResult === 'Error') return false;

    return true;
  }

  // SUBMIT FORM
  const onSubmit = async (data: UserData): Promise<any> => {
    console.log(data);

    if (user.isAuthorized) {
      changeDest('/checkout/payment');

    } else if (!user.isAuthorized) {
      // at this point: email is available and user is not authorized:

      // create user
      const createResult: any = await handleCreateUser(data);

      if (createResult !== true) {
        console.log('create error');
        return;
      }

      updateTempEmail(data.email);

      changeDest('/checkout/payment');
    }
  }

  // CHECK IF EMAIL IS AVAILABLE
  const isAvailable = async (email: string): Promise<any> => {
    // returns true or false
    return (user.isAuthorized || await actions.emailIsAvailable(email));
  }

  return (
    <div id="shipping-form-parent__container">
      <div id="verification-text__container" style={{ display: user.isAuthorized ? 'block' : 'none' }}>
        <span id="verification-text">Please verify that the following information is correct before proceeding to the next page.</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} id="shipping-form">
        <div id="contact-input__container">

          <span className="shipping-form-label">Contact Information</span>
          <input 
            style={{ backgroundColor: errors.email ? 'pink' : 'white' }}
            className="create-input"
            id="create-email-input"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={user.isAuthorized ? user.email : ''}
            ref={register({ required: true, validate: isAvailable })}
          />

          {errors.email && errors.email.type === 'validate' && !user.isAuthorized && (
            <div style={{ color: 'red' }}>Email in use. Please log in if this is your email. Otherwise, enter a different one.</div>
          )}

          {!user.isAuthorized && errors.email && <div>Email is requred</div>}

          <input 
            style={{ backgroundColor: errors.phoneNumber ? 'pink' : 'white' }}
            className="create-input"
            id="create-phone-input"
            type="tel"
            name="phoneNumber"
            placeholder="123-456-7890"
            defaultValue={user.isAuthorized ? user.phoneNumber : ''}
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.phoneNumber && <div style={{ color: 'red' }}>Phone number is required</div>}
        </div>

        <div id="password-input__container" style={{ display: user.isAuthorized ? 'none' : 'block' }}>
          <span className="shipping-form-label">Password</span>
          <input 
            style={{ backgroundColor: errors.password ? 'pink' : 'white' }}
            className="create-input"
            id="create-password-input"
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={user.isAuthorized ? user.password : '' }
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.password && <div style={{ color: 'red' }}>Please enter your password</div>}
        </div>

        <div id="name-input__container">
          <span className="shipping-form-label">Name</span>
          <input 
            style={{ backgroundColor: errors.firstName ? 'pink' : 'white' }}
            className="create-input"
            id="create-firstName-input"
            placeholder="First Name"
            type="text"
            name="firstName"
            defaultValue={user.isAuthorized ? user.firstName : ''}
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.firstName && <div>First name is required</div>}

          <input 
            style={{ backgroundColor: errors.lastName ? 'pink' : 'white' }}
            className="create-input"
            id="create-lastName-input"
            placeholder="Last Name"
            type="text"
            name="lastName"
            defaultValue={user.isAuthorized ? user.lastName : ''}
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.lastName && <div>Last name is required</div>}
        </div>

        <div id="address-input__container">
          <span className="shipping-form-label">Shipping Address</span>
          <input 
            style={{ backgroundColor: errors.street ? 'pink' : 'white' }}
            className="create-input"
            id="create-street-input"
            placeholder="123 React Road APT 1337"
            type="text"
            name="street"
            defaultValue={user.shippingAddress ? user.shippingAddress.street : ''}
            ref={register({ required: true })}
          />
          
          {!user.isAuthorized && errors.street && <div>Street is required</div>}

          <input 
            style={{ backgroundColor: errors.city ? 'pink' : 'white' }}
            className="create-input"
            id="create-city-input"
            placeholder="City"
            type="text"
            name="city"
            defaultValue={user.shippingAddress ? user.shippingAddress.city : ''}
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.city && <div>City is required</div>}

          <input 
            style={{ backgroundColor: errors.zipCode ? 'pink' : 'white' }}
            className="create-input"
            id="create-zipCode-input"
            placeholder="Zip Code"
            type="text"
            name="zipCode"
            defaultValue={user.shippingAddress ? user.shippingAddress.zipCode : ''}
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.zipCode && <div>Zip code is required</div>}

          {/* <input 
            style={{ backgroundColor: errors.country ? 'pink' : 'white' }}
            className="create-input"
            id="create-country-input"
            placeholder="Country"
            type="text"
            name="country"
            defaultValue={user.shippingAddress ? user.shippingAddress.country : ''}
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.country && <div>Country is required</div>} */}

          <input 
            style={{ backgroundColor: errors.state ? 'pink' : 'white' }}
            className="create-input"
            id="create-state-input"
            placeholder="State"
            type="text"
            name="state"
            defaultValue={user.shippingAddress ? user.shippingAddress.state : ''}
            ref={register({ required: true })}
          />

          {!user.isAuthorized && errors.state && <div>State is required</div>}
        </div>

        <button id="create-user-btn">Create Account and Continue to Shipping</button>
      </form>
    </div>
  )
}

export default ShippingForm;
