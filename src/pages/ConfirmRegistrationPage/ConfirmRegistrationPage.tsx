import { Spin, notification } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TokenPair } from '../../models';
import { validateLogInToken } from '../../services/authenticationService';
import { setTokenPairDetails } from '../../services/identityProvider';
import './ConfirmRegistrationPage.scss';

export const ConfirmRegistrationPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const token = searchParams.get('token');

      if (token) {
        const tokenPair: TokenPair = await validateLogInToken(token);

        setTokenPairDetails(tokenPair);
        navigate('/');
      } else {
        notification.error({
          message: t('ConfirmRegistration.ErrorNotification.Message'),
          description: t('ConfirmRegistration.ErrorNotification.Description'),
        });
      }
    }

    fetch();
  }, [navigate, searchParams, t]);

  return (
    <div className="token-login-page">
      <Spin size="large"/>
    </div>
  );
}
