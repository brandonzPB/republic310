import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RouteContext } from '../../../contexts/RouteContext';
import * as interfaces from '../../../modules/interfaces';
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

const user: UserData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: 0,
  street: '',
  city: '',
  zipCode: 0,
  state: '',
  country: '',
};

const CreateUser: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<UserData>();

  const onSubmit = (data: UserData): void => console.log(data);

  const isAvailable = async (email: string): Promise<any> => {
    return await actions.checkEmail(email);
  }

  return (
    <div id="create-user__container" style={{ width: '100vw', height: '100vh' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="contact-input__container">
          <label>
            Email: 
            <input 
              type="email"
              name="email"
              ref={register({ required: true, validate: isAvailable })}
            />
          </label>

          {errors.email && <div>Email is requred</div>}

          <label>
            Phone Number:
            <input 
              style={{ backgroundColor: errors.phoneNumber ? 'pink' : 'white' }}
              type="tel"
              name="phoneNumber"
              ref={register({ required: true })}
            />
          </label>

          {errors.phoneNumber && <div style={{ color: 'red' }}>Phone number is required</div>}
        </div>

        <div id="shipping-input__container">
          <div id="name-input__container">
            <label>
              First Name:
              <input 
                type="text"
                name="firstName"
                ref={register({ required: true })}
              />
            </label>

            {errors.firstName && <div>First name is required</div>}

            <label>
              Last Name:
              <input 
                type="text"
                name="lastName"
                ref={register({ required: true })}
              />
            </label>

            {errors.lastName && <div>Last name is required</div>}
          </div>

          <label>
            Street
            <input 
              type="text"
              name="street"
              ref={register({ required: true })}
            />
          </label>
          
          {errors.street && <div>Street is required</div>}

          <label>
            City:
            <input 
              type="text"
              name="city"
              ref={register({ required: true })}
            />
          </label>

          {errors.city && <div>City is required</div>}

          <div id="country-input__container">
            <label>
              Country:
              <input 
                type="text"
                name="country"
                ref={register({ required: true })}
              />
            </label>

            {errors.country && <div>Country is required</div>}

            <label>
              State:
              <input 
                type="text"
                name="lastName"
                ref={register({ required: true })}
              />
            </label>

            {errors.state && <div>State is required</div>}

            <label>
              Zip Code:
              <input 
                type="number"
                name="zipCode"
                ref={register({ required: true })}
              />
            </label>

            {errors.zipCode && <div>Zip code is required</div>}
          </div>
        </div>

        <button id="create-user-btn">Create Account and Continue to Shipping</button>
      </form>
    </div>
  )
}

export default CreateUser;
