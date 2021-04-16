import axios from 'axios';

const baseUrl: string = '/catalog/user';

// CHECK EMAIL AVAILABILITY
export const checkEmail = (email: object): any => {
  const req: any = axios.post(`${baseUrl}/email`, email);

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// CREATE USER
export const createUser = (user: object): any => {
  const req: any = axios.post(`${baseUrl}/create`, user);

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

/// RESET PASSWORD METHODS ///

// POST RESET REQUEST
export const postResetRequest = (email: object): any => {
  const req: any = axios.post(`${baseUrl}/reset`, email);

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// RESET PASSWORD (after inputting correct code)
export const resetPassword = (userObj: object, token: string): any => {
  const req: any = axios.put(`${baseUrl}/reset/password`, userObj, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// LOGIN
export const login = (credentials: object): any => {
  const req: any = axios.post(`${baseUrl}/login`, credentials);

  return req.then((res: any) => {
    console.log('res.data', res.data);
    return res.data;
  })
    .catch((err: any) => console.error(err));
}

// GET USER DETAILS
export const readUser = (userId: string, token: string): any => {
  const req: any = axios.get(`${baseUrl}/${userId}/details`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// COMPARE PASSWORDS
export const comparePasswords = (userObj: object, userId: string, token: string): any => {
  const req: any = axios.post(`${baseUrl}/${userId}/password`, userObj, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// UPDATE USER DETAILS (excluding shipping details and password)
export const updateUserDetails = (user: object, userId: string, token: string): any => {
  const req: any = axios.put(`${baseUrl}/${userId}/details`, user, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// UPDATE USER PASSWORD
export const updateUserPassword = (user: object, userId: string, token: string): any => {
  const req: any = axios.put(`${baseUrl}/${userId}/password`, user, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// UPDATE USER SHIPPING DETAILS
export const updateUserShippingDetails = (shippingObj: object, userId: string, token: string): any => {
  console.log('shippingObj', shippingObj);
  console.log('userId', userId);
  console.log('token', token);
  
  const req: any = axios.put(`${baseUrl}/${userId}/shipping_details`, shippingObj, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

/// PURCHASE/ORDER METHODS ///

// GET ORDER HISTORY
export const getOrderHistory = (userId: string, token: string): any => {
  const req: any = axios.get(`${baseUrl}/user/${userId}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// POST PAYMENT
export const postPayment = (userId: string, paymentObj: any, token: string): any => {
  const req = axios.post(`${baseUrl}/${userId}/payment`, paymentObj, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// POST ORDER
export const postOrder = (userId: string, order: object, token: string): any => {
  const req: any = axios.post(`${baseUrl}/${userId}/orders`, order, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// EMAIL CONFIRMATION TO USER
export const emailConfirmationToUser = (userObj: any, token: string): any => {
  const req = axios.post(`${baseUrl}/${userObj._id}/confirmation`, userObj, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}

// VERIFY ADMIN
export const verifyAdmin = (credentials: any, token: string): any => {
  const req: any = axios.post(`${baseUrl}/${credentials.userId}/verify_admin`, credentials, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then((res: any) => res.data)
    .catch((err: any) => console.error(err));
}
