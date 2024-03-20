import {Table, TableProps, Alert, Button, Tag, PaginationProps, Pagination} from 'antd';
import {useEffect, useState} from 'react';
import {ColumnsType} from "antd/lib/table";
import {TransactionHistoryTableParams} from "../../models/Transactions/TransactionHistoryTableParams";
import {GetPaginationTransactions} from "../../services/transactionService";
import {TransactionHistoryDto} from "../../models/Transactions/TransactionHistoryDto";
import {TransactionStatusesEnum} from "../../models/Transactions/TransactionStatusesEnum";
import { TableWrapper } from '../../components/TableWrapper/TableWrapper';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

export const HistoryPage = () => {
    const [data, setData] = useState<TransactionHistoryDto[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TransactionHistoryTableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        }
    })

    const columns: ColumnsType<TransactionHistoryDto> = [
        {
            title: 'Source',
            dataIndex: 'source',
        },
        {
            title: 'Recipient',
            dataIndex: 'recipient',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            render: (_, record) => record.date.toLocaleString()
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Invoice',
            dataIndex: 'invoice',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => {
                switch (record.status)
                {
                    case (TransactionStatusesEnum.Completed):
                        return <Tag className='status completed' color='#bbe6c2' key={'tag'}>
                            Completed
                      </Tag>
                    case (TransactionStatusesEnum.Cancelled):
                        return <Tag className='status cancelled' color='red' key={'tag'}>
                            Cancelled
                      </Tag>
                    case (TransactionStatusesEnum.Pending):
                        return <Tag className='status pending' color='#b3b0b093' key={'tag'}>
                            Pending
                      </Tag>
                }
            }
        },
        {
            render: _ => <Button type='text'>...</Button>
        },
    ]

    const handleTableChange: TableProps<TransactionHistoryDto>['onChange'] = (pagination, filters, sorter, extra) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    const paginationOnChange: PaginationProps['onChange'] = (page: number, pageSize: number) => {
        setTableParams({
            ...tableParams,
            pagination: {
                pageSize: pageSize,
                current: page,
            }
        });

        extract({...tableParams, current: page, pageSize});
    }

    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
          return <CaretLeftOutlined />;
        }
        if (type === 'next') {
          return <CaretRightOutlined />;
        }
        return originalElement;
      };

    const extract = (tableProps: any) => {
        setLoading(true);
        GetPaginationTransactions(tableProps)
            .then(model => {
                model.transactions.map((itm, index) => itm.key = index)
                setData(model.transactions);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: model.totalCount
                    }
                })
            })
        setLoading(false);
    }

    useEffect(() => {
        extract(tableParams);
    }, [JSON.stringify(tableParams)]);

    return (
        <TableWrapper>
            <Table
                title={() => <h2>Transaction History</h2>}
                columns={columns}
                rowKey={(record) => record.key}
                dataSource={data}
                pagination={false}
                loading={loading}
                // onChange={handleTableChange}
            />
            <Pagination
                total={tableParams.pagination?.total ?? 1}
                showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} data`}
                defaultPageSize={tableParams.pagination?.defaultPageSize ?? 10}
                defaultCurrent={1}
                onChange={paginationOnChange}
                itemRender={itemRender}
                current={tableParams.pagination?.current}
            />
        </TableWrapper>        
    );
}
