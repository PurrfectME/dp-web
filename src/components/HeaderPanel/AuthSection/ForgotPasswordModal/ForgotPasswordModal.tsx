import { Button, Form, Input, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InitChangePasswordRequest } from '../../../../models/InitChangePasswordRequest';
import { initResetPassword } from '../../../../services/authenticationService';
import './ForgotPasswordModal.scss';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulSendRecovery: () => void;
}

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
  onSuccessfulSendRecovery
}: ForgotPasswordModalProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: InitChangePasswordRequest) => {
    setIsLoading(true);
    await initResetPassword(values);
    setIsLoading(false);

    onSuccessfulSendRecovery();
    onClose();
  }

  const onFinishFailed = (errorInfo: any) => {}

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="forgot-password-modal"
      title={t('HeaderPanel.AuthSection.ForgotPassword.ForgotPasswordModal.Title')}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={t('HeaderPanel.AuthSection.ForgotPassword.ForgotPasswordModal.EmailField')}
          name="email"
          rules={[{ required: true, message: 'Please input email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="send-recovery-button">
            {isLoading ? <Spin size='default'/> : t('HeaderPanel.AuthSection.ForgotPassword.ForgotPasswordModal.SendRecoveryLinkButton')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
