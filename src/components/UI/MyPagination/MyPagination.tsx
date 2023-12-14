import { ConfigProvider, Pagination } from 'antd';
import React from 'react';

interface MyPaginationProps {
  current?: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
}

const MyPagination: React.FC<MyPaginationProps> = ({ current, pageSize, showSizeChanger, total, onChange }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            colorPrimary: '#fff',
            colorPrimaryHover: '#fff',
          },
        },
      }}
    >
      <Pagination
        onChange={onChange}
        current={current}
        pageSize={pageSize}
        showSizeChanger={showSizeChanger}
        total={total}
      />
    </ConfigProvider>
  );
};

export default MyPagination;
