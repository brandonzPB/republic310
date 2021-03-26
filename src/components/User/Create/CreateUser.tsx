import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { RouteContext } from '../../../contexts/RouteContext';
import * as actions from '../../../modules/actions';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  street: string;
  city: string;
  zipCode: number;
  country: string;
  state: string;
};

const CreateUser: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  const { register, handleSubmit, errors } = useForm<UserData>();

  const onSubmit = (data: UserData): void => {
    console.log(data);

    changeDest('payment');
  };

  const isAvailable = async (email: string): Promise<any> => {
    return await actions.emailIsAvailable(email);
  }

  return (
    <div id="create-user__container" style={{ width: '100vw', height: '100vh' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="password-input__container">
          <input 
            style={{ backgroundColor: errors.password ? 'pink' : 'white' }}
            className="create-input"
            id="password-create-input"
            type="password"
            name="password"
            ref={register({ required: true })}
          />

          {errors.password && <div style={{ color: 'red' }}>Please enter your password</div>}
        </div>

        <div id="contact-input__container">
          <input 
            style={{ backgroundColor: errors.email ? 'pink' : 'white' }}
            className="create-input"
            id="email-create-input"
            type="email"
            name="email"
            placeholder="Email"
            ref={register({ required: true, validate: isAvailable })}
          />

          {errors.email && errors.email.type === 'validate' && (
            <div style={{ color: 'red' }}>Email unavailable</div>
          )}

          {errors.email && <div>Email is requred</div>}

          <input 
            style={{ backgroundColor: errors.phoneNumber ? 'pink' : 'white' }}
            className="create-input"
            id="phone-create-input"
            type="tel"
            name="phoneNumber"
            placeholder="123-456-7890"
            ref={register({ required: true })}
          />

          {errors.phoneNumber && <div style={{ color: 'red' }}>Phone number is required</div>}
        </div>

        <div id="shipping-input__container">
          <div id="name-input__container">
            <input 
              style={{ backgroundColor: errors.firstName ? 'pink' : 'white' }}
              className="create-input"
              id="firstname-create-input"
              placeholder="First Name"
              type="text"
              name="firstName"
              ref={register({ required: true })}
            />

            {errors.firstName && <div>First name is required</div>}

            <input 
              style={{ backgroundColor: errors.lastName ? 'pink' : 'white' }}
              className="create-input"
              id="lastname-create-input"
              placeholder="Last Name"
              type="text"
              name="lastName"
              ref={register({ required: true })}
            />

            {errors.lastName && <div>Last name is required</div>}
          </div>

          <input 
            style={{ backgroundColor: errors.street ? 'pink' : 'white' }}
            className="create-input"
            id="street-input"
            placeholder="123 React Road APT 1337"
            type="text"
            name="street"
            ref={register({ required: true })}
          />
          
          {errors.street && <div>Street is required</div>}

          <input 
            style={{ backgroundColor: errors.city ? 'pink' : 'white' }}
            className="create-input"
            id="city-input"
            placeholder="City"
            type="text"
            name="city"
            ref={register({ required: true })}
          />

          {errors.city && <div>City is required</div>}

          <div id="country-input__container">
            <input 
              style={{ backgroundColor: errors.country ? 'pink' : 'white' }}
              className="create-input"
              id="country-input"
              placeholder="Country"
              type="text"
              name="country"
              ref={register({ required: true })}
            />

            {errors.country && <div>Country is required</div>}

            <input 
              style={{ backgroundColor: errors.state ? 'pink' : 'white' }}
              className="create-input"
              id="state-input"
              placeholder="State"
              type="text"
              name="lastName"
              ref={register({ required: true })}
            />

            {errors.state && <div>State is required</div>}

            <input 
              style={{ backgroundColor: errors.zipCode ? 'pink' : 'white' }}
              className="create-input"
              id="zip-input"
              placeholder="Zip Code"
              type="number"
              name="zipCode"
              ref={register({ required: true })}
            />

            {errors.zipCode && <div>Zip code is required</div>}
          </div>
        </div>

        <button id="create-user-btn">Create Account and Continue to Shipping</button>
      </form>
    </div>
  )
}

export default CreateUser;
