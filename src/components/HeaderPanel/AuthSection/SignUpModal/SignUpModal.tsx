import { Button, Form, Input, Modal, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SignUpRequest } from '../../../../models';
import { signUp } from '../../../../services/authenticationService';
import * as Constants from './../../../../constants';
import './SignUpModal.scss';


const { Text } = Typography;

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  openLogInModal: () => void;
  onSuccessfulSignUp: () => void;
}

export const SignUpModal = ({
  isOpen,
  onClose,
  openLogInModal,
  onSuccessfulSignUp
}: SignUpModalProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: SignUpRequest) => {
    setIsLoading(true);
    await signUp(values);
    setIsLoading(false);

    onSuccessfulSignUp();
    onClose();
  }

  const onFinishFailed = (errorInfo: any) => {}

  const onLogInClick = () => {
    onClose();
    openLogInModal();
  }

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} className="signup-modal">
      <h1>{t('HeaderPanel.AuthSection.SignUp.SignUpModal.Title')}</h1>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={t('HeaderPanel.AuthSection.SignUp.SignUpModal.UsernameField')}
          name="username"
          rules={[
            ...Constants.Required('Please input your username!')
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('HeaderPanel.AuthSection.SignUp.SignUpModal.EmailField')}
          name="email"
          rules={[
            ...Constants.Required('Please input your email!'),
            { type: 'email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('HeaderPanel.AuthSection.SignUp.SignUpModal.PasswordField')}
          name="password"
          rules={[
            ...Constants.Required('Please input your password!'),
            ...Constants.PasswordRules
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={t('HeaderPanel.AuthSection.SignUp.SignUpModal.ConfirmPasswordField')}
          name="confirmPassword"
          rules={[
            ...Constants.Required('Please confirm your password!'),
            ...Constants.PasswordConfirmationRules()
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="singup-button">
            {isLoading ? <Spin size='default'/> : t('HeaderPanel.AuthSection.SignUp.SignUpModal.Buttons.SignUp')}
          </Button>
        </Form.Item>

        <Text underline onClick={onLogInClick} className="login-link">
          {t('HeaderPanel.AuthSection.SignUp.SignUpModal.Buttons.LoginLink')}
        </Text>
      </Form>
    </Modal>
  );
}
