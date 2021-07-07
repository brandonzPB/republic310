import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './userUpdateForm.css';

interface UpdateForm {
  email: string;
  password: string;
  phoneNumber: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
};

interface UpdateFormProps {
  isCorrectPassword: (password: string) => any;
  emailIsAvailable: (email: string) => any;
  handleShippingUpdate: (data: any) => any;
  handleUserUpdate: (data: any) => any;
  setLoading: (flag: boolean) => void;
};

const UserUpdateForm: React.FC<UpdateFormProps> = ({ 
    isCorrectPassword, 
    emailIsAvailable, 
    handleShippingUpdate, 
    handleUserUpdate,
    setLoading,
  }: UpdateFormProps) => {

  const { user } = useContext(GlobalContext);

  const { changeDest } = useContext(RouteContext);

  const { register, handleSubmit, errors } = useForm<UpdateForm>();

  // SUBMIT UPDATE FORM
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);

    const shippingUpdateResult: boolean = await handleShippingUpdate(data);

    if (shippingUpdateResult === false) {
      console.log('Shipping update error');
      return false;
    }

    const userUpdateResult: boolean = await handleUserUpdate(data);

    if (userUpdateResult === false) {
      console.log('User update error');
      return false;
    }

    console.log('Successfully updated user');

    setLoading(true);
    setTimeout(() => { changeDest('/') }, 700);
  }

  return (
    <div id="user-update__container">
      <span id="user-update-header">Update your account info</span>
      
      <form onSubmit={handleSubmit(onSubmit)} id="user-update-details-form">
        <div id="email-update__container">
          <span className="user-update-label">Email</span>
          <input 
            style={{ backgroundColor: errors.email ? 'pink' : 'white' }}
            className="update-input"
            id="update-email-input"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={ user.email ? user.email : '' }
            ref={register({ required: false, validate: emailIsAvailable })}
          />
        </div>

        {errors.email && errors.email.type === 'validate' && (
          <div id="update-error-text">Email is already in use</div>
        )}

        <span className="user-update-label">Phone Number</span>
        <input 
          style={{ backgroundColor: errors.phoneNumber ? 'pink' : 'white' }}
          className="update-input"
          id="update-phone-input"
          type="tel"
          name="phoneNumber"
          placeholder="123-456-7890"
          defaultValue={ user.phoneNumber ? user.phoneNumber : '' }
          ref={register({ required: false })}
        />

        {errors.phoneNumber && (
          <div id="update-error-text">Please enter a valid phone number</div>
        )}

        <span className="user-update-label">Password</span>
        <input 
          className="update-input update-password-input"
          type="password"
          name="password"
          placeholder="Current Password"
          ref={register({ required: true, validate: isCorrectPassword })}
        />

        {errors.password && errors.password.type === 'validate' && (
          <div id="update-error-text">Incorrect password</div>
        )}
        
        {errors.password && errors.password.type !== 'validate' && (
          <div id="update-error-text">Please enter your password</div>
        )}

        <span className="user-update-label">Street</span>
        <input 
          className="update-input"
          id="update-street-input"
          type="text"
          name="street"
          placeholder="Street"
          defaultValue={ user.shippingAddress ? user.shippingAddress.street : '' }
          ref={register({ required: false })}
        />
        
        <span className="user-update-label">City</span>
        <input 
          className="update-input"
          id="update-city-input"
          type="text"
          name="city"
          defaultValue={ user.shippingAddress ? user.shippingAddress.city : '' }
          placeholder="City"
          ref={register({ required: false })}
        />

        <span className="user-update-label">Zip Code</span>
        <input 
          className="update-input"
          id="update-zipCode-input"
          type="text"
          name="zipCode"
          defaultValue={ user.shippingAddress ? user.shippingAddress.zipCode : '' }
          placeholder="zipCode"
          ref={register({ required: false })}
        />

        <span className="user-update-label">State</span>
        <input 
          className="update-input"
          id="update-state-input"
          type="text"
          name="state"
          defaultValue={ user.shippingAddress ? user.shippingAddress.state : '' }
          placeholder="State"
          ref={register({ required: false })}
        />

        <span className="user-update-label">Country</span>
        <input 
          className="update-input"
          id="update-country-input"
          type="text"
          name="country"
          defaultValue={ user.shippingAddress ? user.shippingAddress.country : '' }
          placeholder="Country"
          ref={register({ required: false })}
        />

        <button id="submit-update-btn">Update Account</button>
      </form>
    </div>
  )
}

export default UserUpdateForm;
