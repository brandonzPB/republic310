import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import './loginModal.css';

interface LoginForm {
  email: string;
  password: string;
};

interface LoginProps {
  hideModal: () => void;
};

const LoginModal: React.FC<LoginProps> = ({ hideModal }: LoginProps) => {
  const { login } = useContext(GlobalContext);

  const { register, errors, handleSubmit } = useForm<LoginForm>();

  // HANDLE LOGIN (helper)
  const handleLogin = async (data: any): Promise<any> => {
    const credentials: object = { email: data.email, password: data.password };

    const loginResult: string = await login(credentials);

    return loginResult === 'Success';
  }

  // ON SUBMIT
  const onSubmit = async (data: any): Promise<any> => {
    console.log('data', data);

    const loginResult: boolean = await handleLogin(data);

    if (loginResult === false) {
      console.log('Login error');
      return false;
    }

    return hideModal();
  }

  return (
    <div id="login-modal__container"></div>
  )
}

export default LoginModal;
