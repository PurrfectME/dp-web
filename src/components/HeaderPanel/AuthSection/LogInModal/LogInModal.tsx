import { Button, Form, Input, Modal, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogInRequest, TokenPair } from '../../../../models';
import { logIn } from '../../../../services/authenticationService';
import { setTokenPairDetails } from '../../../../services/identityProvider';
import './LogInModal.scss';

const { Text } = Typography;

interface LogInModalProps {
  isOpen: boolean;
  onClose: () => void;
  openSignUpModal: () => void;
  openForgotPasswordModal: () => void;
  onSuccessfulLogIn: () => void;
}

export const LogInModal = ({
  isOpen,
  onClose,
  openSignUpModal,
  openForgotPasswordModal,
  onSuccessfulLogIn
}: LogInModalProps) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: LogInRequest) => {
    setIsLoading(true);
    const tokenPair: TokenPair = await logIn(values);
    setIsLoading(false);

    setTokenPairDetails(tokenPair);

    onSuccessfulLogIn();
    onClose();
  }

  const onFinishFailed = (errorInfo: any) => {}

  const onSignUpClick = () => {
    onClose();
    openSignUpModal();
  }

  const onForgotPasswordClick = () => {
    onClose();
    openForgotPasswordModal();
  }

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} className="singin-modal">
      <h1>{t('HeaderPanel.AuthSection.LogIn.Login')}</h1>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={t('HeaderPanel.AuthSection.LogIn.LogInModal.LoginField')}
          name="login"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('HeaderPanel.AuthSection.LogIn.LogInModal.PasswordField')}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Text underline onClick={onForgotPasswordClick} className="forgot-password-link">
          {t('HeaderPanel.AuthSection.LogIn.LogInModal.ForgotPasswordLink')}
        </Text>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="signin-button">
            {isLoading ? <Spin size='default'/> : t('HeaderPanel.AuthSection.LogIn.LogInModal.Buttons.Login')}
          </Button>
        </Form.Item>

        <Text underline onClick={onSignUpClick} className="signup-link">
          {t('HeaderPanel.AuthSection.LogIn.LogInModal.Buttons.SignUpLink')}
        </Text>
      </Form>
    </Modal>
  );
}
