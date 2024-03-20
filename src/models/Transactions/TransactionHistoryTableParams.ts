import { TablePaginationConfig } from "antd/es/table/interface";
import { FilterValue } from "antd/lib/table/interface";

export interface TransactionHistoryTableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}
