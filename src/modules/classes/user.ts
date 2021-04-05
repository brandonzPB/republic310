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
  phoneNumber?: string;
  orderHistory?: interfaces.Cart[];
  initiateDetails: (inputs: any) => void; 
  updateShippingAddress: (address: interfaces.Address) => void;
  updatePhoneNumber: (phoneNumber: string) => void;
  updateOrderHistory: (history: interfaces.Cart[]) => void;

  constructor() {
    this.isAuthorized = false;

    this.initiateDetails = function(inputs: any): void {
      this.firstName = inputs.firstName;
      this.lastName = inputs.lastName;
      this.email = inputs.email;
      this.password = inputs.password;
      this._id = inputs._id;
      this.accessToken = inputs.accessToken;
    }

    this.updateShippingAddress = function(address: interfaces.Address): void {
      this.shippingAddress = address;
    }

    this.updatePhoneNumber = function(phoneNumber: string): void {
      this.phoneNumber = phoneNumber;
    }

    this.updateOrderHistory = function(history: interfaces.Cart[]): void {
      this.orderHistory = history;
    }
  }
}

export default User;
