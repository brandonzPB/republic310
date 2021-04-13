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
};

const UserUpdateForm: React.FC<UpdateFormProps> = ({ 
    isCorrectPassword, 
    emailIsAvailable, 
    handleShippingUpdate, 
    handleUserUpdate 
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
  }

  return (
    <div id="user-update__container">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {errors.email && errors.email.type === 'validate' && (
          <div style={{ color: 'red' }}>Email is already in use</div>
        )}

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

        {errors.phoneNumber && <div>Please enter a valid phone number</div>}

        <input 
          className="update-input update-password-input"
          type="password"
          name="password"
          placeholder="Current Password"
          ref={register({ required: true, validate: isCorrectPassword })}
        />

        {errors.password && errors.password.type === 'validate' && (
          <div>Incorrect password</div>
        )}
        
        {errors.password && <div>Please enter your password</div>}

        <input 
          className="update-input"
          id="update-street-input"
          type="text"
          name="street"
          placeholder="Street"
          defaultValue={ user.shippingAddress ? user.shippingAddress.street : '' }
          ref={register({ required: false })}
        />
        
        <input 
          className="update-input"
          id="update-city-input"
          type="text"
          name="city"
          defaultValue={ user.shippingAddress ? user.shippingAddress.city : '' }
          placeholder="City"
          ref={register({ required: false })}
        />

        <input 
          className="update-input"
          id="update-zipCode-input"
          type="text"
          name="zipCode"
          defaultValue={ user.shippingAddress ? user.shippingAddress.zipCode : '' }
          placeholder="zipCode"
          ref={register({ required: false })}
        />

        <input 
          className="update-input"
          id="update-state-input"
          type="text"
          name="state"
          defaultValue={ user.shippingAddress ? user.shippingAddress.state : '' }
          placeholder="State"
          ref={register({ required: false })}
        />

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
