import dayjs from 'dayjs';
import { Notification, NotificationType } from '../models/Notification';

export const getNotifications = async (): Promise<Notification[]> =>
  Promise.resolve([
    {
      id: '1',
      timestamp: dayjs().add(-1, 'minutes').toDate(),
      type: NotificationType.TransactionConfirmation,
      header: '<mark>-88.01 USD</mark> (Binance aduasiwy432423nqkwdnasd8324nndas)',
      content: 'Confirmation of the transaction',
      seen: false
    },
    {
      id: '2',
      timestamp: dayjs().add(-46, 'minute').toDate(),
      type: NotificationType.FundsReceived,
      icon: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/22/22dc2b1ef378805e196b3420bffe071de2138a86.jpg',
      header: '<mark>+1.2 BTC</mark> (Binance aduasiwy432423nqkwdnasd8324nndas)',
      content: 'Funds received on the account',
      seen: false
    },
    {
      id: '3',
      timestamp: dayjs().add(-5, 'hours').toDate(),
      type: NotificationType.FundsReturned,
      header: '<mark>+1.2 BTC</mark> (Binance aduasiwy432423nqkwdnasd8324nndas)',
      content: 'Transaction was not performed (funds returned to the account)',
      seen: false
    },
    {
      id: '4',
      timestamp: dayjs().add(-1, 'days').toDate(),
      type: NotificationType.Marketing,
      header: 'Invite friends, get paid! You can earn <mark>$10</mark> for each friend you refer',
      content: 'Tap for more information',
      seen: false
    },
    {
      id: '5',
      timestamp: dayjs().add(-2, 'days').add(-2, 'hours').toDate(),
      type: NotificationType.Service,
      header: 'We have planned maintenance works <mark>at 3:00-4:00 UTC</mark>',
      content: '[REMINDER]',
      seen: false
    }
  ]);
  // httpClient.get('authentication/auth/notifications').json<Notification[]>();
