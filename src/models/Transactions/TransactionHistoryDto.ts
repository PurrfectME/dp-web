
export interface TransactionHistoryDto
{
    key: number,
    guid: string,
    source: string,
    recipient: string,
    date: Date,
    amount: number,
    invoice: string,
    status: Number
}
