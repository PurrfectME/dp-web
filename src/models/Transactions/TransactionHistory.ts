import {TransactionHistoryDto} from "./TransactionHistoryDto";

export interface TransactionHistory {
    transactions: TransactionHistoryDto[],
    totalCount: number
  }
