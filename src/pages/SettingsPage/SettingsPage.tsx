import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSettings, patchSettings } from '../../services/settingsProvider';
import { ChangeEmailModal } from './ChangeEmailModal/ChangeEmailModal';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal';
import './SettingsPage.scss';

const { Option } = Select;

export const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(getSettings().language);
  const [currency, setCurrency] = useState(getSettings().currency);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = React.useState(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = React.useState(false);

  const onChangeLanguage = (value: string) => {
    patchSettings({ language: value });
    i18n.changeLanguage(value);
    setLanguage(value);
  }

  const onChangeCurrency = (value: string) => {
    patchSettings({ currency: value });
    setCurrency(value);
  }

  return (
    <div className='layout-wrapper'>
      <div className='settings-wrapper'>
        <div className='preference-section'>
          <div className='preference-selectors'>
            <h2>{t('SettingsPage.PreferencesSection.Title')}</h2>

            <div className='selectors'>
              <div className='selector-wrapper'>
                <label>{t('SettingsPage.PreferencesSection.LanguageSelector')}</label>
                <Select className='selector' onChange={onChangeLanguage} value={language} suffixIcon={<CaretDownOutlined />}>
                  <Option value="ru">Russian</Option>
                  <Option value="en">English</Option>
                </Select>
              </div>

              <div className='selector-wrapper'>
                <label>{t('SettingsPage.PreferencesSection.CurrencySelector')}</label>
                <Select className='selector' onChange={onChangeCurrency} value={currency} suffixIcon={<CaretDownOutlined />}>
                  <Option value="byn">BYN</Option>
                  <Option value="usd">USD</Option>
                </Select>
              </div>

            </div>
          </div>

          <Divider type='vertical' className='section-divider' />


        </div>


        <div className='action-section'>
        <div className='security'>
          <div className='content'>
            <h2>{t('SettingsPage.SecuritySection.Title')}</h2>
            <div className='btns'>
              <Button shape='round' className='action-button' onClick={() => setIsChangePasswordModalOpen(true)}>
                {t('SettingsPage.PreferencesSection.ChangePasswordButton')}
              </Button>

              <Button shape='round' className='action-button' onClick={() => setIsChangeEmailModalOpen(true)}>
                {t('SettingsPage.PreferencesSection.ChangeEmailButton')}
              </Button>
            </div>
          </div>
        </div>

        <div className='account'>
          <div className='content'>
            <h2>{t('SettingsPage.AccountSection.Title')}</h2>

            <label>{t('SettingsPage.AccountSection.NicknameInput')}</label>
            <Input />

            <Button id='save-btn' className='action-button' shape='round' onClick={() => setIsChangePasswordModalOpen(true)}>
              {t('SettingsPage.AccountSection.SaveSettingButton')}
            </Button>
          </div>
        </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
      <ChangeEmailModal
        isOpen={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
      />
    </div>
  );
}