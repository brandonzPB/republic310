import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import './updateUser.css';

interface UpdateForm {
  email: string;
  password: string;
  confirmPassword: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
};

const UpdateUser: React.FC = () => {
  const { user } = useContext(GlobalContext);

  const { dest, changeDest } = useContext(RouteContext);

  const { register, handleSubmit, errors } = useForm<UpdateForm>();
  
  // CHECK IF EMAIL IS AVAILABLE
  const isAvailable = async (): Promise<any> => {}
  
  // UPDATE STATE

  // SUBMIT UPDATE FORM
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);
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
          defaultValue={ user.email ? user.email : '' }
          ref={register({ required: false, validate: isAvailable })}
        />

        {errors.email && errors.email.type === 'validate' && (
          <div style={{ color: 'red' }}>Email is already in use</div>
        )}

        <input 
          id="update-password-input"
          type="password"
          name="password"
          
        />
      </form>
    </div>
  )
}

export default UpdateUser;
