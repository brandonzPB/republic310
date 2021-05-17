import React, { useState, useContext } from 'react';
import { ImCross } from 'react-icons/im';
import { GlobalContext } from '../../contexts/GlobalContext';
import UserInfoTab from '../User/InfoTab/UserInfoTab';
import LoginTabForm from '../User/LoginTab/LoginTabForm';

import './mobileModal.css';

interface ModalProps {
  hideMobileMenu: () => void;
};

const MobileModal: React.FC<ModalProps> = ({ hideMobileMenu }: ModalProps) => {
  const { user } = useContext(GlobalContext);

  const [loginForm, setLoginForm] = useState({
    hidden: true,
    loading: false,
    error: false
  });

  const [accountDisplay, setAccountDisplay] = useState({ state: false });

  // SHOW LOGIN
  const showLoginForm = (): any => {
    if (!loginForm.hidden) return;
    return setLoginForm({ ...loginForm, hidden: false });
  }

  // HIDE LOGIN
  const closeLoginForm = (): any => {
    if (loginForm.hidden) return;
    return setLoginForm({ ...loginForm, hidden: true });
  }

  // SET LOGIN FORM LOADING
  const setLoading = (): void => {
    setLoginForm({ ...loginForm, loading: true });
  }

  // STOP LOGIN FORM LOADING
  const stopLoading = (): void => {
    setLoginForm({ ...loginForm, loading: false });
  }

  // TOGGLE LOGIN FORM ERROR
  const toggleError = (flag: boolean): void => {
    setLoginForm({ ...loginForm, error: flag });
  }

  // SHOW ACCOUNT OPTIONS
  const showAccountOptions = (): void => {}
  
  return (
    <div id="mobile-modal__container">
      <div id="modal-content">
        <ImCross onClick={hideMobileMenu} id="cross-icon" />

        <div id="modal-login__container" style={{ display: user.isAuthorized ? 'none' : 'block' }}>
          <span className="modal-text modal-login-text" onClick={showLoginForm}>LOG IN</span>
        
          <div id="modal-login-tab" style={{ display: loginForm.hidden ? 'none' : 'block' }}>
            {
              loginForm.loading
                ? <div id="modal-login-loading">Logging in...</div>
                : <LoginTabForm 
                closeLoginForm={closeLoginForm}
                setLoading={setLoading}
                stopLoading={stopLoading}
                loginForm={loginForm}
                toggleError={toggleError}
              />
            }
          </div>
        </div>

        <div
          id="modal-account__container" 
          style={{ display: user.isAuthorized ? 'block' : 'none' }}
          onClick={showAccountOptions}
        >
          <span className="modal-text">ACCOUNT</span>

          <div
            id="modal-account-options"
            style={{ display: accountDisplay.state ? 'block' : 'none' }}
          >
            <UserInfoTab />
          </div>
        </div>

        <span className="modal-text">SHOP</span>

        <span className="modal-text">ABOUT US</span>

        <span className="modal-text">CONTACT US</span>
      </div>
    </div>
  )
}

export default MobileModal;
