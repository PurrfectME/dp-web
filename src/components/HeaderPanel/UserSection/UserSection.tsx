import { BellOutlined, ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Badge, Modal, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import './UserSection.scss';
import { useTranslation } from 'react-i18next';
import { Notification } from '../../../models/Notification';
import { getNotifications } from '../../../services/notificationService';
import { Notifications } from '../Notifications/Notifications';

interface UserSectionProps {
  username: string;
  onLogout: () => void;
}

export const UserSection = ({
  username,
  onLogout
}: UserSectionProps) => {
  const { t } = useTranslation();

  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

  const confirmLogOut = () => {
    Modal.confirm({
      title: t('HeaderPanel.UserSection.LogOut.ConfirmModal.Title'),
      icon: <ExclamationCircleOutlined />,
      content: t('HeaderPanel.UserSection.LogOut.ConfirmModal.Content'),
      okText: t('HeaderPanel.UserSection.LogOut.ConfirmModal.Buttons.Confirm'),
      cancelText: t('HeaderPanel.UserSection.LogOut.ConfirmModal.Buttons.Cancel'),
      onOk: onLogout
    });
  }

  useEffect(() => {
    const fetch = async () => {
      const notifications = await getNotifications();
      if (notifications) {
        setNotificationsData(notifications);
        setUnreadNotifications(notifications.filter(notification => !notification.seen).length);
      }
    };

    fetch();
  }, []);

  return (
    <div className="user-section">
      <Popover
        content={<Notifications notifications={notificationsData} />}
        trigger="click"
      >
        <Badge count={unreadNotifications}>
          <Avatar
            icon={<BellOutlined />}
            size={50}
            className="notifications-icon"
          />
        </Badge>
      </Popover>

      <Avatar
        size={50}
      />

      <span className="username">{username}</span>

      <LogoutOutlined
        className="logout-button"
        onClick={confirmLogOut}
      />
    </div>
  );
}
