import { HeartOutlined } from '@ant-design/icons';
import { ConfigProvider, Statistic } from 'antd';
import React from 'react';

interface MyStatisticProps {
  favoritesCount: number;
}

const MyStatistic: React.FC<MyStatisticProps> = ({ favoritesCount }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Statistic: {
            contentFontSize: 16,
            fontFamily: 'Inter',
          },
        },
      }}
    >
      <Statistic value={favoritesCount} prefix={<HeartOutlined />} />
    </ConfigProvider>
  );
};

export default MyStatistic;
