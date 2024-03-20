import { Button, Form, Input, Modal, Spin } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as FormValidations from '../../../constants/formValidationRules';
import { ChangeEmailRequest } from '../../../models';
import { changeEmail } from '../../../services/authenticationService';
import './ChangeEmailModal.scss';

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeEmailModal = ({
  isOpen,
  onClose
}: ChangeEmailModalProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onSubmit = (values: ChangeEmailRequest) => {
    setIsLoading(true);

    changeEmail(values)
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onSuccess = () => {
    Modal.success({
      title: t('SettingsPage.PreferencesSection.ChangeEmailModal.SuccessChangeEmail.Title'),
      content: t('SettingsPage.PreferencesSection.ChangeEmailModal.SuccessChangeEmail.Content')
    });
    onClose();
    form.resetFields();
  }

  const onError = () => {
    Modal.error({
      title: t('SettingsPage.PreferencesSection.ChangeEmailModal.FailChangeEmail.Title'),
      content: t('SettingsPage.PreferencesSection.ChangeEmailModal.FailChangeEmail.Content')
    });
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="change-email-modal"
      title={t('SettingsPage.PreferencesSection.ChangeEmailModal.Title')}
    >
      <Form
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onSubmit}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label={t('SettingsPage.PreferencesSection.ChangeEmailModal.Email')}
          name="newEmail"
          rules={[
            ...FormValidations.Required('Please enter new email!'),
            { type: 'email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            {isLoading
              ? <Spin size='default'/>
              : t('SettingsPage.PreferencesSection.ChangeEmailModal.SubmitButton')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}