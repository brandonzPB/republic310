import * as interfaces from '../interfaces';

class User implements interfaces.User {
  isAuthorized: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  _id: string;
  accessToken: string;
  shippingAddress?: interfaces.Address;
  phoneNumber?: string;
  orderHistory: interfaces.CompleteCart[];
  initiateDetails: (inputs: any) => void; 
  updateShippingAddress: (address: any) => void;
  updatePhoneNumber: (phoneNumber: string) => void;
  updateOrderHistory: (history: interfaces.CompleteCart[]) => void;
  authorizedUser: () => void;

  constructor() {
    this.isAuthorized = false;
    this._id = 'empty';
    this.accessToken = 'empty';
    this.orderHistory = [];

    this.initiateDetails = function(inputs: any): void {
      this.firstName = inputs.firstName;
      this.lastName = inputs.lastName;
      this.email = inputs.email;
      this.password = inputs.password;
      this._id = inputs._id;
      this.accessToken = inputs.accessToken;
    }

    this.updateShippingAddress = function(address: any): void {
      this.shippingAddress = {
        street: address.street,
        city: address.city,
        zipCode: address.zip_code,
        state: address.state,
        country: address.country,
      }
    }

    this.updatePhoneNumber = function(phoneNumber: string): void {
      this.phoneNumber = phoneNumber;
    }

    this.updateOrderHistory = function(history: interfaces.CompleteCart[]): void {
      this.orderHistory = history;
    }

    this.authorizedUser = function(): void {
      this.isAuthorized = true;
    }
  }
}

export default User;
