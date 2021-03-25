import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import { Route, Redirect } from 'react-router-dom';
import * as interfaces from '../../../modules/interfaces';
import * as actions from '../../../modules/actions';

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  shippingAddress: interfaces.Address;
  error: any
};

const initialUser: UserForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: 0,
  shippingAddress: {
    street: '',
    city: '',
    zipCode: 0,
    state: '',
    country: '',
  },
  error: '',
}

const CreateUser: React.FC = () => {
  const { dest, changeDest } = useContext(RouteContext);

  const [user, setUser] = useState<UserForm>(initialUser);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>): Promise<any> => {
    e.preventDefault();

    setUser({
      ...user,
      error: '',
    });

    /// FORM ERROR CHECKS ///

    if (!user.firstName.trim()) { return setUser({ ...user, error: 'firstName' })};
    if (!user.lastName.trim()) { return setUser({ ...user, error: 'lastName' })};
    if (!user.email.trim()) { return setUser({ ...user, error: 'email' })};
    if (!user.phoneNumber) { return setUser({ ...user, error: 'phone' })};

    if (!user.password.trim() || !user.confirmPassword.trim() || user.password !== user.confirmPassword) {
      return setUser({
        ...user,
        error: 'password'
      });
    }

    if (!user.shippingAddress.street.trim()) { return setUser({ ...user, error: 'street' })};
    if (!user.shippingAddress.city.trim()) { return setUser({ ...user, error: 'city' })};
    if (!user.shippingAddress.zipCode) { return setUser({ ...user, error: 'zipCode' })};
    if (!user.shippingAddress.state.trim()) { return setUser({ ...user, error: 'state' })};
    if (!user.shippingAddress.country.trim()) { return setUser({ ...user, error: 'country' })};

    const createResult: any = await actions.createUser(user);

    if (createResult === 'Error') { return setUser({ ...user, error: 'email_exists' })};

    // success: redirect to order payment page
    changeDest('payment');

    setUser({
      ...user,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: 0,
      shippingAddress: {
        street: '',
        city: '',
        zipCode: 0,
        state: '',
        country: '',
      },
      error: '',
    })
  }

  return (
    <div id="create-user__container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          className="create-input"
          id="name-input"
          onChange={handleChange}
          name="firstName"
          value={user.firstName}
        />

        <button id="create-user-btn">Create Account and Continue to Payment</button>
      </form>
    </div>
  )
}

export default CreateUser;
