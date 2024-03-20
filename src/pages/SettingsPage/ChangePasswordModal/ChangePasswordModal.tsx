import { Button, Form, Input, Modal, Spin } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as FormValidations from '../../../constants/formValidationRules';
import { ChangePasswordRequest } from '../../../models';
import { changePassword } from '../../../services/authenticationService';
import './ChangePasswordModal.scss';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({
  isOpen,
  onClose
}: ChangePasswordModalProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);

  const [form] = Form.useForm();


  const onSubmit = (values: ChangePasswordRequest) => {
    setIsLoading(true);
    changePassword(values)
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onError = () => {
    Modal.error({
      title: t('SettingsPage.PreferencesSection.ChangePasswordModal.FailChangePassword.Title'),
      content: t('SettingsPage.PreferencesSection.ChangePasswordModal.FailChangePassword.Content')
    });
  }

  const onSuccess = () => {
    onClose();

    Modal.success({
      title: t('SettingsPage.PreferencesSection.ChangePasswordModal.SuccessChangePassword.Title'),
      content: t('SettingsPage.PreferencesSection.ChangePasswordModal.SuccessChangePassword.Content')
    });

    form.resetFields();
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="change-password-modal"
      title={t('SettingsPage.PreferencesSection.ChangePasswordModal.Title')}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label={t('SettingsPage.PreferencesSection.ChangePasswordModal.OldPassword')}
          name="oldPassword"
          rules={[
            ...FormValidations.Required('Please enter email!')
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label={t('SettingsPage.PreferencesSection.ChangePasswordModal.NewPassword')}
          name="newPassword"
          rules={[
            ...FormValidations.Required('Please enter new password!'),
            ...FormValidations.PasswordRules
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={t('SettingsPage.PreferencesSection.ChangePasswordModal.NewPasswordRepeat')}
          name="newPasswordRepeat"
          rules={[
            ...FormValidations.Required('Please repeat new password!'),
            ...FormValidations.PasswordConfirmationRules('newPassword')
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            {isLoading
              ? <Spin size='default'/>
              : t('SettingsPage.PreferencesSection.ChangePasswordModal.SubmitButton')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}