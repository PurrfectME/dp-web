import { Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { clearIdentityDetails, getIdentityDetails } from '../../services/identityProvider';
import { AuthSection } from './AuthSection/AuthSection';
import './HeaderPanel.scss';
import { NavigationSection } from './NavigationSection/NavigationSection';
import { UserSection } from './UserSection/UserSection';

export const HeaderPanel = () => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername('');
    clearIdentityDetails();
    navigate(PageRoutes.Main);
  }, [navigate])

  const onSuccessfulLogin = () => {
    const identityDetails = getIdentityDetails();

    setUsername(identityDetails!.username);
    setIsLoggedIn(true);
  }

  const onSuccessfulSignUp = () => {
    Modal.success({
      title: t('HeaderPanel.AuthSection.SignUp.SuccessfulModal.Title'),
      content: t('HeaderPanel.AuthSection.SignUp.SuccessfulModal.Content'),
    });
  }

  const onSuccessfulSendRecovery = () => {
    Modal.success({
      title: t('HeaderPanel.AuthSection.ForgotPassword.SuccessfulSendRecoveryModal.Title'),
      content: t('HeaderPanel.AuthSection.ForgotPassword.SuccessfulSendRecoveryModal.Content')
    });
  }

  useEffect(() => {
    const identity = getIdentityDetails();

    if (identity) {
      setIsLoggedIn(true);
      setUsername(identity.username);
    }
  }, []);

  return (
    <div className="header-panel">
      <NavigationSection
        onNavigate={navigate}
        isLoggedIn={isLoggedIn}
      />
      {isLoggedIn
      ? <UserSection
          username={username}
          onLogout={onLogout}
        />
      : <AuthSection
          onSuccessfulLogin={onSuccessfulLogin}
          onSuccessfulSignUp={onSuccessfulSignUp}
          onSuccessfulSendRecovery={onSuccessfulSendRecovery}
        />}
    </div>
  );
}
