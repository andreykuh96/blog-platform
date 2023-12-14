import { Button, ConfigProvider } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React from 'react';

interface MyButtonProps {
  children: React.ReactNode;
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
  size?: SizeType;
}

const MyButton: React.FC<MyButtonProps> = ({ children, type = 'text', size = 'large' }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBorderColor: '#52C41A',
            defaultColor: '#52C41A',
            colorPrimaryHover: '#52C41A',
            colorPrimaryActive: '#52C41A',
          },
        },
      }}
    >
      <Button size={size} type={type}>
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default MyButton;
