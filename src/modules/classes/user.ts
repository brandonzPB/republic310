import { access } from 'node:fs';
import * as interfaces from '../interfaces';

class User implements interfaces.User {
  isAuthorized: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  _id?: string;
  accessToken?: string;
  shippingAddress?: interfaces.Address;
  phoneNumber?: number;
  orderHistory?: interfaces.Cart[];

  constructor() {
    this.isAuthorized = false;
  }

  initiateUserDetails(firstName: string, lastName: string, email: string, password: string, _id: string, accessToken: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this._id = _id;
    this.accessToken = accessToken;
  }

  updateShippingAddress(shippingAddress: interfaces.Address) {
    this.shippingAddress = shippingAddress;
  }

  getShippingAddress() {
    return this.shippingAddress;
  }

  updatePhoneNumber(phoneNumber: number) {
    this.phoneNumber = phoneNumber;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  updateOrderHistory() {}
}

export default User;
