export enum NotificationType {
  None,
  TransactionConfirmation,
  FundsReceived,
  FundsReturned,
  Marketing,
  Service
}

export interface Notification {
  id: string;
  timestamp: Date;
  type: NotificationType;
  icon?: string;
  header: string;
  content?: string;
  seen: boolean;
}
