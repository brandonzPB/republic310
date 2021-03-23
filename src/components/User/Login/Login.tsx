import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';

interface UserState {
  email: string;
  password: string;
  err: null | 'email' | 'password';
};

const Login: React.FC = () => {
  const { login } = useContext(GlobalContext);

  const [user, setUser] = useState<UserState>({
    email: '',
    password: '',
    err: null
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();

    setUser({
      ...user,
      err: null
    });

    // check for errors in input (before submitting to axios)
    if (!user.email.trim()) {
      setUser({
        ...user,
        err: 'email'
      });
      return;
    } else if (!user.password.trim()) {
      setUser({
        ...user,
        err: 'password'
      });
      return;
    }

    // no input errors: send to axios

    // setUser({
    //   ...user,
    //   email: '',
    //   password: '',
    //   err: null
    // });
  }

  return (
    <div id="login__container">
    </div>
  )
}

export default Login;
