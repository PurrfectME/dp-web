import React from 'react';
import { useTranslation } from 'react-i18next';
import { useModalState } from '../../../hooks/useModalState';
import './AuthSection.scss';
import { LogInModal } from './LogInModal/LogInModal';
import { SignUpModal } from './SignUpModal/SignUpModal';
import { ForgotPasswordModal } from './ForgotPasswordModal/ForgotPasswordModal';

interface AuthSectionProps {
  onSuccessfulLogin: () => void;
  onSuccessfulSignUp: () => void;
  onSuccessfulSendRecovery: () => void;
}

export const AuthSection = ({
  onSuccessfulLogin,
  onSuccessfulSignUp,
  onSuccessfulSendRecovery
}: AuthSectionProps) => {
  const { t } = useTranslation();
  const [isLogInModalOpen, openLogInModal, closeLogInModal] = useModalState();
  const [isSignUpModalOpen, openSignUpModal, closeSignUpModal] = useModalState();
  const [isForgotPasswordModalOpen, openForgotPasswordModal, closeForgotPasswordModal] = useModalState();

  return (
    <div className="auth-section">
      <h3 onClick={openSignUpModal}>{t('HeaderPanel.AuthSection.SignUp.SignUp')}</h3>
      <h3 onClick={openLogInModal}>{t('HeaderPanel.AuthSection.LogIn.Login')}</h3>

      <LogInModal
        isOpen={isLogInModalOpen}
        onClose={closeLogInModal}
        openSignUpModal={openSignUpModal}
        openForgotPasswordModal={openForgotPasswordModal}
        onSuccessfulLogIn={onSuccessfulLogin}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        openLogInModal={openLogInModal}
        onSuccessfulSignUp={onSuccessfulSignUp}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
        onSuccessfulSendRecovery={onSuccessfulSendRecovery}
      />
    </div>
  );
};
