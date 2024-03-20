import { Button, Form, Input, message, Spin } from 'antd';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ResetPasswordPage.scss';
import * as Constants from '../../constants';
import { TokenPair, TokenPayload } from '../../models';
import { ResetPasswordRequest } from '../../models/ResetPasswordRequest';
import { confirmResetPassword } from '../../services/authenticationService';
import { setTokenPairDetails } from '../../services/identityProvider';
import { Nullable } from '../../utils/Nullable';


interface ResetPasswordFormValues {
  password: string;
  repeatPassword: string;
}

export const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<Nullable<string>>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
    }
  }, [searchParams]);

  const onFinish = async (values: ResetPasswordFormValues) => {
    if (token) {
      setIsLoading(true);

      const request: ResetPasswordRequest = {
        jwt: token,
        newPassword: values.password
      }

      const tokenPair: TokenPair = await confirmResetPassword(request);
      setTokenPairDetails(tokenPair);

      setIsLoading(false);
      message.success('Password has been successfully changed!');

      navigate('/');
    }
  }

  const onFinishFailed = (errorInfo: any) => {}

  const isTokenExpired = () => token ? jwt<TokenPayload>(token).exp < new Date().getTime() / 1000 : true;

  return isTokenExpired()
    ? <TokenExpired />
    : (
      <div className="change-password-page">
        <h1>{t('ChangePasswordPage.Title')}</h1>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={t('ChangePasswordPage.PasswordField')}
            name="password"
            rules={[
              ...Constants.Required('Please enter your password!'),
              ...Constants.PasswordRules
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={t('ChangePasswordPage.RepeatPasswordField')}
            name="repeatPassword"
            rules={[
              ...Constants.Required('Please confirm your password!'),
              ...Constants.PasswordConfirmationRules()
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isLoading ? <Spin size='default'/> : t('ChangePasswordPage.ConfirmButton')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
}

const TokenExpired = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToMainPage = () => navigate('/');

  return (
    <div className="token-expired-page">
      <div className="message-container">
        <h1>{t('ChangePasswordPage.LinkExpired.BackToMainPageButton')}</h1>
        <Button type="primary" onClick={navigateToMainPage}>{t('ChangePasswordPage.LinkExpired.BackToMainPageButton')}</Button>
      </div>
    </div>
  )
}
