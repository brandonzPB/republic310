import * as interfaces from './interfaces';

class User implements interfaces.User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
  resetCode?: string;
  shippingAddress?: interfaces.Address;
  phoneNumber?: number;
  orderHistory?: interfaces.Cart[];

  constructor(firstName: string, lastName: string, email: string, password: string, _id: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this._id = _id;
  }

  updateResetCode() {}

  getResetCode() {}

  updateShippingAddress() {}

  getShippingAddress() {}

  updatePhoneNumber() {}

  getPhoneNumber() {}

  updateOrderHistory() {}
}

export default User;
