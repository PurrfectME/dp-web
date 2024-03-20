import {TransactionHistory} from "../models/Transactions/TransactionHistory";
import {TransactionHistoryTableParams} from "../models/Transactions/TransactionHistoryTableParams";
import {httpClient} from "./httpClient";

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_CURRENT_PAGE_SIZE = 10;


export const GetPaginationTransactions = async (tableParams: TransactionHistoryTableParams): Promise<TransactionHistory> =>
{
    let currentPage = tableParams.pagination?.current ?? DEFAULT_CURRENT_PAGE;
    let pageSize =  tableParams.pagination?.pageSize ?? DEFAULT_CURRENT_PAGE_SIZE;

   return  await httpClient.get(`transactions/all?CurrentPage=${currentPage}&PageSize=${pageSize}`)
       .json<TransactionHistory>();
}
