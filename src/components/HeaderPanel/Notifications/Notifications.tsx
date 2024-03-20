import './Notifications.scss';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Notification } from '../../../models/Notification';
import { NotificationItem } from './NotificationItem/NotificationItem';

export interface NotificationsProps {
  notifications: Notification[];
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  const { t } = useTranslation();

  const groupByDays = (notifications: Notification[]): Map<string, Array<Notification>> => {
    const notificationsByDayMap = new Map<string, Array<Notification>>();

    notifications.forEach(notificationItem => {
      const dateGroup = dayjs(notificationItem.timestamp).format('dddd, MMMM D YYYY');

      const dataArray = notificationsByDayMap.get(dateGroup);

      if (dataArray) {
        dataArray.push(notificationItem);
        return;
      }

      notificationsByDayMap.set(dateGroup, [notificationItem]);
    });

    return notificationsByDayMap;
  }

  const dayTitle = (timestamp: string) => {
    const date = dayjs(timestamp);

    if (dayjs().diff(date, 'days') === 0) {
      return t('HeaderPanel.UserSection.Notifications.Today');
    }

    if (dayjs().diff(date, 'days') === 1) {
      return t('HeaderPanel.UserSection.Notifications.Yesterday');
    }

    return dayjs(timestamp).format('D MMMM');
  }

  const dayNotifications = (notifications: Notification[]) =>
    notifications.map(notificationItem => <NotificationItem key={notificationItem.id} notification={notificationItem} />)

  return (
    <div className="notifications-container">
      {Array
        .from(groupByDays(notifications), ([date, notifications]) => {
        return (
          <div className="day-container" key={date}>
            <div className="day-details">
              <span className="day-title">{dayTitle(date)}</span>
              <span className="date">{date}</span>
            </div>
            {dayNotifications(notifications)}
          </div>
        );
      })}
    </div>
  );
}
