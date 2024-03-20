import './NotificationItem.scss';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Notification, NotificationType } from '../../../../models/Notification';

export interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { t } = useTranslation();

  const formatShortTimestamp = () => {
    const notificationDate = dayjs(notification.timestamp);
    const raisedMoreThen12HoursAgo = notificationDate.isBefore(dayjs().add(-12, 'hours'));

    if (raisedMoreThen12HoursAgo) {
      return notificationDate.format('hh:mm A');
    }

    const raisedMoreThenHourAgo = notificationDate.isBefore(dayjs().add(-1, 'hour'));

    if (raisedMoreThenHourAgo) {
      return dayjs().diff(notificationDate, 'hours')
        + t('HeaderPanel.UserSection.Notifications.NotificationItem.HoursShort') + ' '
        + t('HeaderPanel.UserSection.Notifications.NotificationItem.Ago');
    }

    return dayjs().diff(notificationDate, 'hours')
      + t('HeaderPanel.UserSection.Notifications.NotificationItem.MinutesShort') + ' '
      + t('HeaderPanel.UserSection.Notifications.NotificationItem.Ago');
  };

  const notificationColor = () => {
    switch (notification.type) {
      case NotificationType.None:
        return 'grey1';
      case NotificationType.TransactionConfirmation:
        return 'orange';
      case NotificationType.FundsReceived:
        return 'green';
      case NotificationType.FundsReturned:
        return 'red';
      case NotificationType.Marketing:
        return 'purple';
      case NotificationType.Service:
        return 'blue';
    }

    return 'grey1';
  };

  const notificationIcon = () => {
    if (notification.icon) {
      return (
        <img src={notification.icon} className="notification-icon" alt='notification-icon' />
      )
    }

    return (<div className="notification-icon"></div>)
  }

  return (
    <div className={`notification-item-container ${notificationColor()}`}>
      <span className="timestamp">{formatShortTimestamp()}</span>
      <div className="color-indicator"></div>
      {notificationIcon()}
      <div className="notification-payload">
        <span className="header" dangerouslySetInnerHTML={{ __html: notification.header }}></span>
        <span className="content">{notification.content ?? ''}</span>
      </div>
    </div>
  );
}
