import { Spin, notification } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { confirmEmailChange } from '../../services/authenticationService';
import './ConfirmEmailChangePage.scss';

export const ConfirmEmailChangePage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      confirmEmailChange(token)
        .then(onSuccess)
        .catch(onFail);
    } else {
      notification.error({
        message: t('ConfirmEmailChangePage.EmptyTokenError.Message'),
        description: t('ConfirmEmailChangePage.EmptyTokenError.Description'),
      });
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [searchParams, t]);

  const onSuccess = () => {
    setIsLoading(false);
    setIsSuccess(true);
  }

  const onFail = () => {
    setIsLoading(false);
    setIsSuccess(false);
  }

  return (
    <div className="confirm-change-email-page">
      {isLoading
        ? <Spin size="large"/>
        : <div className='result-wrapper'>
            {isSuccess
              ? <span className='success-result'>{t('ConfirmEmailChangePage.SuccessMessage')}</span>
              : <span className='fail-result'>{t('ConfirmEmailChangePage.FailMessage')}</span>
            }
            <Link to={PageRoutes.Main}>{t('ConfirmEmailChangePage.GoToHomePage')}</Link>
          </div>
      }
    </div>
  );
}
